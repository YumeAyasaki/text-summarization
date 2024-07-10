from datasets import load_dataset
import numpy as np
from random import shuffle

class Dataset():
    consine_data = None
    data = None
    
    def __init__(self):
        self.consine_data = np.load('data/CNN_Consine_Data.npy')
        self.data = load_dataset("cnn_dailymail", '3.0.0', split= "test")
        self.data = self.data.rename_column("article", "text")
        self.data = self.data.rename_column("highlights", "summary")
    
    def __call__(self):
        return self
        
    def get_all_neighbor_document(self, thresh_hold = 0.7, max_steps = 3):
        if max_steps == -1:
            max_steps = self.consine_data.shape[0]+1
        
        threshed_matrix = np.copy(self.consine_data)
        threshed_matrix[threshed_matrix < thresh_hold] = 0
        visiting_matrix = np.zeros ((threshed_matrix.shape))
        
        threshed_matrix_2 = threshed_matrix    
        threshed_matrix_3 = np.copy(threshed_matrix)
        
        for i in range (max_steps-1):
            if (i == 0):
                threshed_matrix_2 = np.max(threshed_matrix[:, :, None] * threshed_matrix[None, :, :], axis = 1)
            else:
                threshed_matrix_2 = np.max(threshed_matrix_2[:, :, None] * threshed_matrix[None, :, :], axis = 1)
            threshed_matrix_3 = np.amax(np.array([threshed_matrix_2 ,threshed_matrix_3]), axis=0)
            threshed_matrix_2[threshed_matrix_2 < thresh_hold] = 0
        threshed_matrix_3 [threshed_matrix_3 < thresh_hold] = 0
        return visiting_matrix, threshed_matrix_3
    
    def get_neighbor_document(self, slt_idx, thresh_hold = 0.7, max_steps = -1):
        if max_steps == -1:
            max_steps = self.consine_data.shape[0]+1
        elif max_steps == 1:
            return self.consine_data
        threshed_matrix = self.consine_data
        threshed_matrix[threshed_matrix < thresh_hold] = 0
        
        threshed_matrix_2 = np.copy(threshed_matrix)
        threshed_matrix_3 = np.copy(threshed_matrix)
        
        for i in range (0, max_steps):
            if (i == 0):
                threshed_matrix_2 = np.max(threshed_matrix[slt_idx, :, None] * threshed_matrix[None, :, :], axis = 1)
            else:
                threshed_matrix_2 = np.max(threshed_matrix_3[slt_idx, :, None] * threshed_matrix[None, :, :], axis = 1)
            threshed_matrix_3[slt_idx] = np.amax(np.array([threshed_matrix_2[0] ,threshed_matrix_3[slt_idx]]), axis=0)
            threshed_matrix_2[threshed_matrix_2 < thresh_hold] = 0
        threshed_matrix_3 [threshed_matrix_3 < thresh_hold] = 0
        return threshed_matrix_3
    
    def get_related_document(self, slt_idx, thresh_hold=0.9, max_steps = 1):
        threshed_matrix_2 =  self.get_neighbor_document(slt_idx = slt_idx, thresh_hold = thresh_hold, max_steps = max_steps)
        
        result = np.argwhere (threshed_matrix_2[slt_idx] > thresh_hold)
        # return result.tolist(), self.data[result]['summary']
        return result.tolist()
    
    def get_data(self, num, indices):
        requested_data = {"idx": [], "text": [], "summary": [], "hidden_state": []}
        
        for idx in indices:
            if 0 <= idx < len(self.data):
                requested_data["idx"].append(idx)
                requested_data["text"].append(self.data["text"][idx])
                requested_data["summary"].append(self.data["summary"][idx])
                requested_data["hidden_state"].append([[0, 0], [0, 0]])
                
        remaining = num - len(indices)
        if remaining > 0:
            available_indices = list(range(len(self.data)))
            # Remove already used indices
            for used in indices:
                available_indices.remove(used)
            # Shuffle remaining indices
            shuffle(available_indices)
            for _ in range(remaining):
                idx = available_indices.pop()
                requested_data["idx"].append(idx)
                requested_data["text"].append(self.data["text"][idx])
                requested_data["summary"].append(self.data["summary"][idx])
                requested_data["hidden_state"].append([[0, 0], [0, 0]])

        return requested_data
    
Dataset = Dataset()