<script lang="ts">
  import { teams } from "../store";
  import SvelteTable from "svelte-table";
  // import { Table } from "agnostic-svelte"; TODO try
  import { trans } from "../trans";
  export let showRank = false;

  const columns = [
    {
      key: "name",
      label: "Name",
      title: trans("name"),
      value: (row) => row.name,
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

  if (showRank) {
    columns.unshift(
      {
        key: "rank",
        label: "Rank",
        title: "rank",
        value: (row) => row.rank,
        sortable: true,
      },
      {
        key: "wins",
        label: "Victories",
        title: trans("wins"),
        value: (row) => row.wins,
        sortable: true,
      },
      {
        key: "pointsDiff",
        label: "PointsDiff",
        title: "Points diff",
        value: (row) => row.pointsDiff,
        sortable: true,
      }
    );
  }
</script>

<SvelteTable rows={$teams} {columns} />
