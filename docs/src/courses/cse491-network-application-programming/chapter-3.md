# UNIX Socket Programming
## Preliminary
Server and client exchange messages over network through a common [socket API](./chapter-2.md#internet-socket)

### Transportation-layer protocols
#### UDP

- Single socket to receive messages
- No guarantee of delivery
- Not necessarily in-order delivery
- **Datagram**
    - Independent packets
- Must address each packet
- Examples
    - Multimedia
    - VoIP

#### TCP

- Connection-oriented, dedicated socket for each connection
- Reliable, ensuring delivery
- Byte **stream**, in-order delivery
- Setup connection before data transfer
- Examples
    - Web
    - email
    - ssh

### Port
A host can have up to 2<sup>16</sup> ports and they're used by different processes on the host. The port numbers are used to identify entities (processes) on a host. Port numbers can be

1. Well-known (ports 0 ~ 1023)
1. Registered (ports 1024 ~ 49151)
    - can be used by ordinary users
1. Dynamic, private, or ephemeral (ports 49152 ~ 65535)

- **Servers** and **daemons** (medium between applications and the kernel) usually use well-known ports
    - https: 443
    - ssh: 22
- Client usually use dynamic ports
    - Assigned by the kernel at run time

### IP address
Each attachment point on the Internet is assigned with a unique **address**. However, it hard for human to memorize the numeric addresses. Instead, we prefer to deal with names, hence the domain name server (DNS) provides the mapping of host names to their IP address.

#### IPv4 Internet addressing
```c
#include <netinet/in.h>

/* Internet address structure */
struct in_addr {
    in_addr_t s_addr;                   /* 32-bit IPv4 address */
};

/* Socket address */
struct sockaddr_in {
    u_char          sin_len;            /* length (16, optional) */
    u_short         sin_family;         /* address family (AF_INET) <- v4 */
    u_short         sin_port;           /* UDP or TCP port */

    struct in_addr  sin_addr;           /* IP address */
    char            sin_zero[8];        /* unused (padding) */
}
```
#### IPv6 Internet addressing
```c
#include <netinet/in.h>

/* Internet address structure */
struct in6_addr {
    uint8_t s6_addr[16];                /* 128-bit IPv6 address */
};

#define SIN6_LEN                       /* required for compile-time tests */

/* Socket address */
struct sockaddr_in6 {
    sa_family_t     sin6_family;        /* AF_INET6 <- v4 */
    in_port_t       sin6_port;          /* transport layer port num */
    uint32_t        sin6_flowinfo;      /* IPv6 flow information */
    struct in6_addr sin6_addr;          /* IPv6 address */
    /* set of interfaces for a scope */
    uint32_t        sin6_scope_id;
}
```
#### Byte ordering
The endianess (big/little) may be different between hosts, so we should use a byte-ordering translation procedure to maintain the compatibility.
```c
#include <netinet/in.h>
uint32_t htonl(uint32_t hostlong);
uint16_t htons(uint16_t hostshort);
uint32_t ntohl(uint32_t netlong);
uint16_t ntohs(uint16_t netshort);
```

- **h**: host byte order
- **n**: network (remote) byte order
- **l**: long (4 bytes), used to convert IP addresses
- **s**: short (2 bytes), used to convert port numbers

#### UNIX data types

<table>
    <tr>
        <th>Datatype</th>
        <th>Description</th>
        <th>Header</th>
    </tr>
    <tr>
        <td>int8_t</td>
        <td>Unsigned 8-bit integer</td>
        <td rowspan=6>&lt;sys/types.h&gt;</td>
    </tr>
    <tr>
        <td>uint8_t</td>
        <td>Signed 16-bit integer</td>
    </tr>
    <tr>
        <td>int16_t</td>
        <td>Signed 16-bit integer</td>
    </tr>
    <tr>
        <td>uint16_t</td>
        <td>Unsigned 16-bit integer</td>
    </tr>
    <tr>
        <td>int32_t</td>
        <td>Signed 32-bit integer</td>
    </tr>
    <tr>
        <td>uint32_t</td>
        <td>Unsigned 32-bit integer</td>
    </tr>
    <tr>
        <td>sa_family_t</td>
        <td>Address family of socket address structure</td>
        <td rowspan=2>&lt;sys/socket.h&gt;</td>
    </tr>
    <tr>
        <td>socklen_t</td>
        <td>Length of socket address structure, normally uint32_t</td>
    </tr>
    <tr>
        <td>in_addr_t</td>
        <td>IPv4 address, normally uint32_t</td>
        <td rowspan=2>&lt;netinet/in.h&gt;</td>
    </tr>
    <tr>
        <td>in_port_t</td>
        <td>TCP or UDP port, normally uint16_t</td>
    </tr>
</table>

## Basic Socket I/O
Socket is a **file descriptor** which allows an application to read/write data from/to the network.
::: tip File Descriptor
In Unix, all of the I/O are treated as files stream, where `stdin`, `stdout` and `stderr` are mapped to `0`, `1` and `2` in the file descriptor table respectively.
:::
### TCP connection
TCP establishes connection before each host can transmit data.
#### TCP server
We require a serial of procedures to build up a TCP server

1. `socket()`: Get the **file descriptor**
1. `bind()`: Connect the file descriptor with **IP** and **port**
1. `listen()`: **Wait** for request from clients
1. `accept()`: **Accept** request
1. `read()`: Read data from the socket

##### socket procedure
```c
#include <sys/socket.h>

int socket(int family, int type, int protocol);
```

- `socket()` returns the file descriptor
    - A negative value indicates an error
- `family`
    - `AF_INET` for IPv4
    - `AF_INET6` for IPv6
- `type`
    - `SOCK_STREAM`, typically TCP
    - `SOCK_DGRAMm` typically UDP
- `protocol`, if not compatible with `type`, then default to TCP or UDP based on `type`
    - `IPPROTO_TCP`
    - `IPPROTO_UDP`
    - ...

##### bind procedure
```c
int fd;
struct sockaddr_in srv;

src.sin_family  = AF_INET;
src.sin_port    = htons(80);

src.sin_addr.s_addr = htonl(INADDR_ANY);

if (bind(fd, (struct sockaddr*) &srv, sizeof(srv)) < 0) {
    perror("bind");
    exit(1);
}
```


## Advanced Socket I/O
## Some Programming Notes
