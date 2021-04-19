<template>
    <div>
        <h3><b>post请求:</b>  </h3><i>{{market}}</i>
    </div>
</template>

<script>
import http from '@/request/api.js'
export default {
    computed: {
       
    },
    data(){
        return{
            market:'',
        }
    },
    async mounted(){
        let market = await http.getMarkets()
        this.market = market.msg
    },
    methods:{
       
    }

}
</script>

<style scoped lang="scss">
    
</style>