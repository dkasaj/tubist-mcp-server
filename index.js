#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { spawn } from "child_process";

const server = new Server(
  {
	name: "tubist-mcp",
	version: "1.0.0",
  },
  {
	capabilities: {
	  tools: {},
	},
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
	tools: [
	  {
		name: "play",
		description: "Play a YouTube video in Tubist",
		inputSchema: {
		  type: "object",
		  properties: {
			url: {
			  type: "string",
			  description: "YouTube video URL, e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			},
		  },
		  required: ["url"],
		},
	  },
	],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "play") {
	const url = request.params.arguments.url;
	
	if (typeof url !== "string" || url.length === 0) {
	  throw new Error("play requires a non-empty YouTube video address string.");
	}
	
	const tubistURL = `tubist://play?${url}`;
	spawn("open", [tubistURL], { stdio: "ignore" });
	
	return {
	  content: [
		{
		  type: "text",
		  text: `Playing YouTube video in Tubist: ${url}`,
		},
	  ],
	};
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});

const transport = new StdioServerTransport();
await server.connect(transport);