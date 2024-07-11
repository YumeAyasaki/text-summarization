# NLU demo

This repository contains a demo application for Natural Language Understanding (NLU) tasks: text summarization and retrieval. The model leverages the hidden state of the encoder for both functionalities.

## Key feature
- Text Summarization: Provides a summary of a given text input.
- Text Retrieval: Searches for related text based on the hidden representation learned by the encoder. (Note: The demo uses an already-calculated database since doing this task in real-time on a personal computer is too time-consuming).

## Tech Stack:

Frontend: Next.js.
Backend: Django.
Deep Learning Framework: PyTorch.
Containerization: Docker.

### Project Structure:

```client```: Next.js application for user interface and backend interaction. (Contains Dockerfile)
```backend```: Django application implementing the summarization and retrieval logic. (Contains Dockerfile)
```docker-compose.yml```: Configures and runs both client and backend containers together.
```run.bat```: Windows script for easy project startup.

## Getting Started:
### With docker
1. Install Docker and Docker Compose according to their official documentation.
2. Getting this repository on your local machine.
2. (If cloning from Github) Get the data and model files for the server. The files are provided [here](https://drive.google.com/drive/folders/1ThR-hCepbC2jf5R23rR7fvocPuDaN86h?usp=sharing) and [here](https://drive.google.com/file/d/1sL7A8IK59jj75mEOxuGJncUG6-r2ZnLI/view?usp=sharing). You should put it in the outer server folder like this.  
![Where to put files](assets/where-to-put-files.png)
3. Run ```docker compose up``` to start both client and backend services.
3. (Optional) Run the run.bat file for a quick launch.
4. Go to http://localhost:3000 or http://127.0.0.1:3000.

Note: The server takes a long time to run (probably up to 10 minutes to finalize things) so please kindly wait for it. Most of the time, it'll finish when there's a line indicating that the data is finished prepared like this.
![Screen shows that the server is probably finished](assets/finished.png)

### Without docker
#### Frontend
1. Install neccessary library with ```npm install``` or ```yarn install```.
2. For fast build, run ```npm run dev``` or ```yarn dev```.
3. For longer but more stable build, run ```npm run build``` or ```yarn build```, and then ```npm run start``` or ```yarn start```.
4. Go to http://localhost:3000 or http://127.0.0.1:3000.
#### Backend
Note: We don't exactly know how to do this more properly, so this is our (or my) attempt to replicate it.
1. Prepare a virtual environment for our program using Python 3.9. We recommend Anaconda or virtualenv.
2. Remove the 3 torch-related package in the ```requirements.txt```, which are ```torch```, ```torchaudio``` and ```torchvision```.
3. Install ```torch``` separately. You can install ```torch``` normally, or try to install ```torch``` with gpu following [this](https://pytorch.org/get-started/locally/).
4. Install the rest using ```pip install -r requirements.txt```.
4. (If cloning from Github) Get the data and model files for the server. Please look at the above section for more details.
5. Run the server with ```python manage.py runserver```.

### Demo
![Demo for text summarization](assets/demo_2.gif)
![Demo for related text retrieval](assets/demo_1.gif)

### Further Development:
- Experiment with different deep learning architectures for summarization and retrieval.
- Fix the copy of the hidden state feature when running in a container: For some reason, running with docker makes the feature useless.
- Add a more appealing way to visualize the NLU.

### Note:
This is a basic example. Feel free to add or remove files to your content if you know what you do. Don't be us. Or me, my partner is cool tbh.