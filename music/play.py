# -*- encoding: UTF-8 -*-

import sys
import time
from naoqi import ALProxy

if (len(sys.argv) < 2):
    print "Usage: 'python play.py IP FILE'"
    sys.exit(1)

IP = sys.argv[1]
PORT = 9559
FILE = sys.argv[2]

try:
    aup = ALProxy("ALAudioPlayer", IP, PORT)
    aud = ALProxy("ALAudioDevice", IP, PORT)
except Exception,e:
    print "Could not create proxies"
    print "Error was: ",e
    sys.exit(1)

volume = aud.getOutputVolume()
aud.setOutputVolume(70)
aup.playFile("/home/nao/" + FILE)
aud.setOutputVolume(volume)

print("DONE")
