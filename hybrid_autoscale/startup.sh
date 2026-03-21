export DEBIAN_FRONTEND=noninteractive

sudo -E apt update
sudo -E apt install -y python3-pip git

git clone https://github.com/m25ai2047-png/VCC.git /VCC

cd /VCC/hybrid_autoscale/app

pip3 install flask

nohup python3 app.py > /var/log/app.log 2>&1 &
