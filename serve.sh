#!/usr/bin/env sh

ifconfig
ng serve --host 0.0.0.0 --ssl true --port 4200 --disable-host-check
