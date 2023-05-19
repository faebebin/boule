<script lang="ts">
  import Teams from "./Teams.svelte";
  import Courts from "./Courts.svelte";
  import type { Player, Team } from "../store";
  import { v4 as uuidv4 } from "uuid";
</script>

<Teams />
<Courts />
