# traktor-dpro-adapter-app

NodeJS and Electron based sys-tray app to synchronize D-Pro's Tempo with Traktor's Tempo.

Traktor sends Tempo Information as MIDI Clock Messages but D-Pro can not handle MIDI Clock Messages. D-Pro can be controlled via MIDI and has a remote control option to set the tempo via MIDI.

So this tool translates the MIDI Clock Messages to a BPM value and sends this BPM (60 to 187) as MIDI Control Change Message to D-Pro.