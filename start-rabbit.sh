#!/bin/sh

docker run -p 4369:4369 -p 5671:5671 -p 5672:5672 -p 15671:15671 -p 15672:15672 -p 15691:15691 -p 15692:15692 -p 25672:25672 rabbitmq:3.8.17-rc.1-management

# user: guest
# password: guest