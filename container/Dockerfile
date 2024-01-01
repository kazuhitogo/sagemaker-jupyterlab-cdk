FROM python:3.10.10-buster

COPY ./requirements.txt /root/requirements.txt
COPY ./Dockerfile /root/Dockerfile

ARG NB_USER="sagemaker-user"
ARG NB_UID="1000"
ARG NB_GID="100"

RUN useradd --create-home --shell /bin/bash --gid "${NB_GID}" --uid ${NB_UID} ${NB_USER} && \
    pip install pip -U --no-cache-dir && \
    pip install -r /root/requirements.txt --no-cache-dir

USER ${NB_UID}

CMD jupyter lab --ip 0.0.0.0 --port 8888 \
  --ServerApp.base_url="/jupyterlab/default" \
  --ServerApp.token='' \
  --ServerApp.allow_origin='*'