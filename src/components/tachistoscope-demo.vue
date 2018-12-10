<template>
    <div>
        <vue-tachistoscope :reading-options = "readingOptions"/>
    </div>
</template>
<script>
import VueTachistoscope from "./tachistoscope-reader.vue";
export default {
    components : {
        VueTachistoscope
    },
    data : function() {
        return {
            readingOptions : [
                {
                    name : "Moby Dick ch1",
                    url : "/demo-text/moby-dick-1.txt"
                },
                {
                    name : "Moby Dick ch2",
                    url : "/demo-text/moby-dick-2.txt"
                },
                {
                    name : "Moby Dick ch3",
                    url : "/demo-text/moby-dick-3.txt"
                },
                {
                    name : "Genesis chs 1-10",
                    url : "/demo-text/genesis-chs-1-10.txt"
                }
            ]
        };
    }
}
</script>