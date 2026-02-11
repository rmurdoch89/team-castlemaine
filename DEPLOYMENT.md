# Deployment Guide - Team Castlemaine

## Docker Deployment on Ubuntu Server (192.168.1.151)

### Prerequisites
- Docker and Docker Compose installed on Ubuntu server
- Git installed
- SSH access to the server

### Step 1: SSH into your Ubuntu server
```bash
ssh rumbo@192.168.1.151
```

### Step 2: Clone the repository
```bash
cd ~
git clone https://github.com/rmurdoch89/team-castlemaine.git
cd team-castlemaine
```

### Step 3: Build and run with Docker Compose
```bash
docker-compose up -d --build
```

The site will be available at `http://192.168.1.151:3000`

### Step 4: Verify it's running
```bash
docker ps
curl http://localhost:3000
```

### Updating the site
```bash
cd ~/team-castlemaine
git pull origin main
docker-compose up -d --build
```

## Cloudflare Tunnel Setup

### Step 1: Install cloudflared on Ubuntu server
```bash
# Download and install cloudflared
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
sudo dpkg -i cloudflared-linux-amd64.deb
```

### Step 2: Authenticate with Cloudflare
```bash
cloudflared tunnel login
```
This will open a browser window for authentication.

### Step 3: Create a tunnel
```bash
cloudflared tunnel create team-castlemaine
```
Note the tunnel ID that gets created.

### Step 4: Configure the tunnel
Create a config file at `~/.cloudflared/config.yml`:
```yaml
tunnel: <YOUR-TUNNEL-ID>
credentials-file: /home/rumbo/.cloudflared/<YOUR-TUNNEL-ID>.json

ingress:
  - hostname: teamc.rumbo.dev
    service: http://localhost:3000
  - service: http_status:404
```

### Step 5: Create DNS record
```bash
cloudflared tunnel route dns team-castlemaine teamc.rumbo.dev
```

### Step 6: Run the tunnel as a service
```bash
sudo cloudflared service install
sudo systemctl start cloudflared
sudo systemctl enable cloudflared
```

### Step 7: Check tunnel status
```bash
sudo systemctl status cloudflared
cloudflared tunnel list
```

Your site will now be available at `https://teamc.rumbo.dev`

## Manual Cloudflare Tunnel Setup (Alternative)

If you prefer to set up the tunnel via Cloudflare Dashboard:

1. Go to https://one.dash.cloudflare.com/
2. Navigate to Networks > Tunnels
3. Click "Create a tunnel"
4. Name it "team-castlemaine"
5. Install connector on your Ubuntu server (copy the command shown)
6. Add a public hostname:
   - Subdomain: `teamc`
   - Domain: `rumbo.dev`
   - Service Type: HTTP
   - URL: `localhost:3000`
7. Save the tunnel

## Troubleshooting

### Check Docker logs
```bash
docker logs team-castlemaine
```

### Restart the container
```bash
docker-compose restart
```

### Rebuild from scratch
```bash
docker-compose down
docker-compose up -d --build
```

### Check Cloudflare tunnel logs
```bash
sudo journalctl -u cloudflared -f
```
