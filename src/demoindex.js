import TachistoscopeDemo from "./components/tachistoscope-demo.vue";
import Vue from "vue";

new Vue({
    el : "#widget",
    components : {
        TachistoscopeDemo
    },
    render : function(createElement) {
        return createElement(TachistoscopeDemo);
    }
})