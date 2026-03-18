#!/bin/bash

sudo apt update
sudo apt install -y python3-pip git

git clone https://github.com/m25ai2047-png/VCC.git

cd hybrid_autoscale/app

pip3 install flask

python3 app.py
