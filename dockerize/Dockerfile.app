FROM jwilder/dockerize

ENTRYPOINT dockerize -wait tcp://app:3000