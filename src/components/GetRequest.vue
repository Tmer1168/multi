<template>
    <div>
        <h2><b>get请求:</b>  </h2><i>{{text}}</i>
    </div>
</template>

<script>
import http from '@/request/api.js'
export default {
    computed: {
       
    },
    data(){
        return{
            text:'',
        }
    },
    async mounted(){
        let text = await http.getMiningList()
        this.text = text.msg
    },
    methods:{
          
    }

}
</script>

<style scoped lang="scss">
    
</style>