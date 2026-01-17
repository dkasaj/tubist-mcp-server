# Tubist MCP Server

**Remember the last time when you closed a tab or quit your browser and YouTube audio abruptly stopped...? Bet you were angry.**

**Tubist exists for that not to happen.** It's a lightweight macOS menu bar player that keeps YouTube going independently of your browser.

[Tubist is available for free on the Mac App Store](https://apps.apple.com/app/id1603180719).

**This MCP server lets Claude and other AI assistans control Tubist when asked to do so from the assistant's macOS app.**

Just ask naturally:

- _play the Billie Eilish Tiny Desk concert_
- _find me some jazz on YouTube for focus and play it in Tubist_
- _look for an orchestral rendering of Super Mario music on YouTube and play it in Tubist_

## Features

- 🎬 Play any YouTube video with a simple request...  (unless it longer exists 😞)
- 🎵 Ideal for background audio (concerts, podcasts, music)
- 🤖 Control via natural language through AI assistants
- ⚡ Instant playback - just ask and it plays without any UI interruptions

## Prerequisites / minimum requirements

- **macOS 13 (Ventura) and above**
- **Tubist v1.3** installed ([Tubist is available for free on the Mac App Store](https://apps.apple.com/app/id1603180719).)
- **Node.js** 18.0.0 or higher
- **Claude Desktop** or another MCP-compatible client

## Installation

1. **Clone this repository:**
   ```bash
   git clone https://github.com/dkasaj/tubist-mcp-server.git
   cd tubist-mcp-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Claude Desktop:**
   
   Edit your Claude Desktop config file:
   ```bash
   # On macOS
   nano ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

   Add the Tubist MCP server, use the path where you installed it:
   ```json
   {
	 "mcpServers": {
	   "Tubist - menu bar player for YouTube": {
		 "command": "/opt/homebrew/bin/node",
		 "args": ["/path/to/tubist-mcp-server/index.js"]
	   }
	 }
   }
   ```

   **Important:** Replace `/path/to/tubist-mcp/index.js` with the actual path where you cloned this repo.

   **Find your Node.js path:**
   ```bash
   which node
   ```
   Use this path instead of `/opt/homebrew/bin/node` if different.

4. **Restart Claude Desktop** completely (quit and reopen, don't just close the window)

## Usage

Once configured, you can ask Claude to play YouTube videos naturally:

**Examples:**
- "Play the Billie Eilish Tiny Desk concert"
- "Find me some jazz on YouTube for focus and play it in Tubist"
- "Look for an orchestral rendering of Super Mario music on YouTube and play it in Tubist"

## How It Works

1. You make a request to Claude
2. Claude uses the MCP protocol to call this server
3. The server opens the YouTube video in Tubist using the `tubist://play?` URL scheme
4. Video starts playing automatically

## Troubleshooting

### "MCP server disconnected" error
- Check that the path in `claude_desktop_config.json` is correct
- Verify Node.js path with `which node`
- Make sure you restarted Claude Desktop completely

### Video doesn't play
- Ensure Tubist is installed and can be launched
- Try opening Tubist manually first to verify it works
- Check that the YouTube URL is valid. Claude for instance sometimes uses a link to a video that no longer exists.

### Tool doesn't appear in Claude
- Confirm the config file is valid JSON (use a JSON validator)
- Check for log Claude Desktop logs: `~/Library/Logs/Claude/`
- Make sure you saved the config file and restarted Claude


## Technical Details

This MCP server uses the `Server` class with `setRequestHandler` pattern (rather than `McpServer.tool()`) due to a known bug in MCP SDK 1.25.x where arguments aren't passed correctly to tool handlers.

**Tool definition:**
- **Name:** `play`
- **Parameter:** `url` (YouTube video URL)
- **Action:** Opens video in Tubist via `tubist://play?[url]` URL scheme

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.

## License

MIT © Daniel Kašaj

## Links

- [Tubist on the Mac App Store](https://apps.apple.com/app/id1603180719)
- [Model Context Protocol Documentation](https://modelcontextprotocol.io)
- [Claude Desktop](https://claude.ai/download)

---

**Made with ❤️ for background YouTube listening**