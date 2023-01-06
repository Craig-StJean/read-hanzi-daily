<script lang="ts">
  import { invoke } from "@tauri-apps/api/tauri";
  import { Command } from "@tauri-apps/api/shell";

  let name = "";
  let greetMsg = "";
  let result = "";

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    greetMsg = await invoke("greet", { name });
	
	const command = Command.sidecar('deno-binaries/jwDownloader', ['w', '202301', 'E', 'EPUB', '.\\wt.epub']);
	const exec = await command.execute();
	result = exec.stdout.trim();
  }
</script>

<div>
  <div class="row">
    <input id="greet-input" placeholder="Enter a name..." bind:value={name} />
    <button on:click={greet}> Greet </button>
  </div>
  <p>{greetMsg}{result}</p>
</div>
