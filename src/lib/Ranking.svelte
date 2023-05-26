<script lang="ts">
  import { teams } from "../store";
  import SvelteTable from "svelte-table";
  import { trans } from "../trans";

  const columns = [
    {
      key: "name",
      label: "Name",
      title: trans("name"),
      value: (row) => row.name,
      sortable: true,
    },
    {
      key: "points",
      label: "Points",
      title: trans("wins"),
      value: (row) => row.points,
      sortable: true,
    },
    {
      key: "members",
      label: "Members",
      title: trans("players"),
      value: (row) => row.members.map((m) => m.name).join(", "),
      sortable: true,
    },
  ];
</script>

<SvelteTable rows={$teams} {columns} />
