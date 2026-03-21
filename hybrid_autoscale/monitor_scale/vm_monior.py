import psutil
import time
import subprocess

SCALE_UP_THRESHOLD = 75
SCALE_DOWN_THRESHOLD = 60

INST_NAME = "autoscale-vm"
ZONE = "us-central1-a" # asia-south2-a

def instance_exists():
    result = subprocess.run(
        ["gcloud","compute","instances","list",
        "--filter=name="+INST_NAME,
        "--format=value(name)"],
        capture_output=True,
        text=True
    )
    return INST_NAME in result.stdout


while True:
    cpu = psutil.cpu_percent(interval=2)
    memory = psutil.virtual_memory().percent
    print("CPU:", cpu, "MEM:", memory)
    if cpu > SCALE_UP_THRESHOLD or memory > SCALE_UP_THRESHOLD:
        print("if scale up needed", cpu, memory)
        if not instance_exists():
            print("Scaling UP => Creating VM")
            subprocess.run([
                "gcloud","compute","instances","create",INST_NAME,
                "--zone",ZONE,
                "--machine-type","e2-micro",
                "--image-family","debian-11",
                "--image-project","debian-cloud",
                "--tags", "flask-app",
                "--metadata-from-file", "startup-script=startup.sh"
            ])

    elif cpu < SCALE_DOWN_THRESHOLD and memory < SCALE_DOWN_THRESHOLD:
        print("if scale down needed", cpu, memory)
        if instance_exists():
            print("Scaling DOWN => Deleting VM")
            subprocess.run([
                "gcloud","compute","instances","delete",
                INST_NAME,
                "--zone",ZONE,
                "--quiet"
            ])
    else:
        print("Load Normal skip")

    time.sleep(20)
