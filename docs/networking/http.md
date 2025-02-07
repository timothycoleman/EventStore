# HTTP configuration

HTTP is the primary protocol for EventStoreDB. It is used in gRPC communication and HTTP APIs (management, gossip and diagnostics).

Unlike for [TCP protocol](./tcp.md), there is no separation between internal and external communication. The HTTP endpoint always binds to the IP address configured in the `ExtIp` setting.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--ext-ip` |
| YAML                 | `ExtIp` |
| Environment variable | `EVENTSTORE_EXT_IP` |

When the `ExtIp` setting is not provided, EventStoreDB will use the first available non-loopback address. You can also bind HTTP to all available interfaces using `0.0.0.0` as the setting value. If you do that, you'd need to configure the `ExtHostAdvertiseAs` setting (read mode [here](./nat.md)), since `0.0.0.0` is not a valid IP address to connect from the outside world.

The default HTTP port is `2113`. Depending on the [security settings](../security/) of the node, it either responds over plain HTTP or via HTTPS. There is no redirect, so if you try reaching a secure node via HTTP, you can an empty response.

You can change the HTTP port using the `HttpPort` setting:

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--http-port` |
| YAML                 | `HttpPort` |
| Environment variable | `EVENTSTORE_HTTP_PORT` |

**Default**: `2113`

If your network setup requires any kind of IP address, DNS name and port translation for internal or external communication, you can use available [address translation](./nat.md) settings.

## KeepAlive pings

The reliability of the connection between the client application and database is crucial for the stability of the solution. If the network is not stable or has some periodic issues, the client may drop the connection. Stability is essential for the [stream subscriptions](/docs/clients/grpc/subscribing-to-streams/README.md) where a client is listening to database notifications. Having an existing connection open when an app resumes activity allows for the initial gRPC calls to be made quickly, without any delay caused by the reestablished connection.

EventStoreDB supports for the built-in gRPC mechanism for keeping the connection alive. gRPC allows sending http2 pings on the transport to detect if the connection is down. If the other side does not acknowledge the ping within a certain period, the connection will be closed. Note that pings are only necessary when there's no activity on the connection.

Keepalive pings are enabled by default, with the default interval set to 10 seconds. Value bases on the [gRPC proposal](https://github.com/grpc/proposal/blob/master/A8-client-side-keepalive.md#extending-for-basic-health-checking) that suggests this value as the minimum. This value compromises making sure that the connection is open and not making too many redundant network calls. 

You can customise the following Keepalive settings:

### keepAliveInterval

After a duration of `keepAliveInterval` (in milliseconds), if the server doesn't see any activity, it pings the client to see if the transport is still alive.

To disable the Keepalive ping, you need to set the `keepAliveInterval` value to `-1`.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--keep-alive-interval` |
| YAML                 | `KeepAliveInterval` |
| Environment variable | `KEEP_ALIVE_INTERVAL` |

**Default**: `10000`

### keepAliveTimeout

After having pinged for keepalive check, the server waits for a duration of `keepAliveTimeout` (in milliseconds). If no activity is seen even after that, the connection is closed.

| Format               | Syntax |
| :------------------- | :----- |
| Command line         | `--keep-alive-timeout` |
| YAML                 | `KeepAliveTimeout` |
| Environment variable | `KEEP_ALIVE_TIMEOUT` |

**Default**: `10000`

As a general rule, we do not recommend putting EventStoreDB behind a load balancer. However, if you are using it and want to benefit from the Keepalive feature, then you should make sure if the compatible settings are properly set. Some load balancers may also override the Keepalive settings. Most of them require setting the idle timeout larger/longer than the `keepAliveTimeout`. We suggest checking the load balancer documentation before using Keepalive pings. 