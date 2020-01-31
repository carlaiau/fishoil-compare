<template>
  <Layout>
    <div class="container">
      <div class="">
        <table class="table is-striped">
          <thead>
            <tr>
              <td></td>
              <th>Title</th>
              <th>DHA</th>
              <th>EPA</th>
              <th>Serving Size</th>
              <th>Capsules Per Container</th>
            </tr>
          </thead>
          <tr v-for="{node} in $page.oils.edges" :key="node.id">
            <td class="p-4 border">
              <g-image :src="node.Image.url" class="" style="width: 100px"/>
            </td>
            <td class="border px-4 py-2">{{node.Title}}</td>
            <td class="border px-4 py-2"> {{node.DHA}}</td>
            <td class="border px-4 py-2">{{node.EPA}}</td>
            <td class="border px-4 py-2">{{node.ServingSize}}</td>
            <td class="border px-4 py-2">{{node.CapsulesPerContainer}}</td>
            <td class="border px-4 py-2">
              <a :href="node.iherb_link" target="_blank" rel="noopener noreferrer">
                {{node.iherb_price.toFixed(2)}}
              </a>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query{
  oils: allStrapiOil{
    edges{
      node {
          id
          Title
          iherb_link
          iherb_price
          ServingSize
          DHA
          EPA
          CapsulesPerContainer
        	Image {
            url (width: 400, height: 400, quality: 90)
          }
      }
    }
  }
}
</page-query>
<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>

</style>
