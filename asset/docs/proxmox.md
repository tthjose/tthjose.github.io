Proxmox (PVE) doc:
1. Instruction
- Remember to set valid static IP address for PVE or it will be inaccessible after installation.
    + This can be fixed by signing in on the PVE machine and modify config file at etc/network/interfaces
- The PVE may be unable to connect to the Internet due to DNS misconfiguration (which results in inability to resolve FQDN but ability to ping IP addresses) or time-misconfiguration (which results in inability to process https request). Fixes including reconfugure DNS and update time
- Disable business repositories so they don't throw error when running apt update
- Deployment of Tailscale:
    + The recommended way to deploy Tailscale is to install it on every service (including PVE, VMs and containers)
    + Use tailscale serve to simplify access to service (with FQDN and https). Use attribute --bg for background run
    + Tailscale will NOT work on LXCs unless /dev/net/tun device passthrough is enabled
    + Use tailscale funnel to publish service to the Internet (very limited in use cases)
2. Deployment
2.1. Vaultwarden
- Use community script to install alpine-vaultwarden
- The default port for this lxc is https://localhost:8000. Remember to use <https+insecure> in tailscale serve
2.2. Nextcloud server
- Install Nextcloud server snap to simplify deployment
- The Ubuntu lxc base does not include snap, requiring additional configuration
+ Install and configure squashfs on both PVE and the container
+ Install snap through apt install snapd
+ Install Nextcloud Server through snap install nextcloud
- The default port for this lxc is https://localhost:80 (or :443 if enforced https)
- Its DNS may be misconfigured at installation, modify them to Google or CLoudflare DNS