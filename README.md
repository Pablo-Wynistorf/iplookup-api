Hello! With this image you are able to host your own iplookup-api. 
With it you can get your own or other users public ip address.
If you just want to use the api without running it your self, dial http://raw.ip.onedns.ch/ip

Currently it only supports ipv4, but in the near feature i will implement the option to also get ipv6 addresses.

You can run the api using this command:

```
docker run -itd --name iplookup-api -p 80:80 pablo06/iplookup-api:v1.0.1
```

And if you want to run the api with a iplookup request log. Use this command:

```
docker run -itd --name iplookup-api-log -p 80:80 -v /var/log/iplookup-api/:/app/log/ pablo06/iplookup-api:v1.0.1-log
```



Known Issues:
- Not showing the correct public ip, when using a cdn, loadbalancer or proxy. Fix is incomming.
