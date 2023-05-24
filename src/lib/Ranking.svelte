<script lang="ts">
  import { courts, teams } from "../store";
  import type { Court, Team } from "../store";
  import SvelteTable from "svelte-table";

  let teamsList: Team[] = [];

  teams.subscribe((tl) => {
    teamsList = tl;
  });

  const columns = [
    {
      key: "name",
      label: "Name",
      title: "Name",
      value: (row) => row.name,
      sortable: true,
    },
    {
      key: "points",
      label: "Points",
      title: "Points",
      value: (row) => row.points,
      sortable: true,
    },
    {
      key: "members",
      label: "Members",
      title: "Members",
      value: (row) => row.members.map((m) => m.name).join(", "),
      sortable: true,
    },
  ];
</script>

<SvelteTable rows={teamsList} {columns} />
