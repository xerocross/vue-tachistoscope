<template>
    <div class = "tachistoscope-reader">
        
        <div class="row">

            <div 
                class="col-sm-8 " 
            >
                <div>
                    <div class = "reading-box">
                    
                        <a 
                            class="btn btn-primary btn-lg" 
                            @click="start" >start</a>
                        <a 
                            class="btn btn-primary btn-lg" 
                            @click = "stop">stop</a>
                        <a 
                            class="btn btn-primary btn-lg" 
                            @click = "backToBeginning">reset</a>
                        <div class="reading-line">
                            {{ currentWordGroup }}
                        </div>
                    </div>
                    
                </div>
            </div>
            <div class="col-sm-4">

                <form @submit.prevent = "">

                    <text-loader
                        :text-options = "readingOptions"
                        @event_text_loaded = "receiveText"
                        @event_loading = "setLoading"
                    >

                    </text-loader>
                    <div class="form-group">
                        <label>Time Per Flash: {{ timePerFlash }} ms</label>
                        
                        <input 
                            v-model = "timePerFlash" 
                            type="range" 
                            min="50" 
                            max="3500" 
                            value="200" 
                            class="slider form-control">
                        
                    </div>

                    <div class="form-group">
                        <label>Words Per Group: {{ wordsPerGroup }}</label>
                        
                        <select 
                            v-model = "wordsPerGroup" 
                            class="form-control">
                            <option 
                                v-for = "i in [1, 2,3,4,5,6, 7, 8, 10]" 
                                :key = "i"
                                :value = "i"
                            >{{ i }}</option>
                        </select>
                        
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>
<script>
import {TextLoader} from "cross-vue-base";
import Debounce from "lodash.debounce";

let resetText = "Text Appears Here";
export default {
    components : {
        TextLoader
    },
    props : {
        readingOptions : {
            type : Array,
            default : []
        }
    },
    data () {
        return {
            wordGroups : [],
            currentIndex : 0,
            rawText : "",
            words : [],
            wordIndex : 0,
            textURL : "",
            textLoaded : false,
            tickingLink : undefined,
            wordsPerGroup : 4,
            timePerFlash : 500,
            isReading : false,
            currentLoadedText : undefined,
            currentWordGroup : resetText,
        };
    },
    computed : {
    },
    watch : {
        timePerFlash : Debounce(function() {
            if (this.isReading) {
                this.stop();
                this.start();
            }
        },300)
    },
    methods : {
        load () {
            this.getText();
        },
        getTextByKey (key) {
            for(let i = 0; i < this.readingOptions.length; i++) {
                if (this.readingOptions[i].url == key) {
                    return this.readingOptions[i];
                }
            }
            return null;
        },
        start () {
            if (!this.textLoaded) {
                return;
            }
            this.stop();
            let self = this;
            this.isReading = true;
            self.tickingLink = setInterval(function() {
                self.currentWordGroup = self.getNextWordGroup();
            },self.timePerFlash);
        },
        stop () {
            this.isReading = false;
            clearInterval(this.tickingLink);
        },
        receiveText (rawText) {
            this.rawText = rawText;
            this.textLoaded = true;
            this.splitWords();
        },
        setLoading () {
            this.textLoaded = false;
        },
        splitWords () {
            let words;
            let text = this.rawText.replace(/--\s*/g,"-- ");
            words = text.split(/\s+/g);
            this.words = [];
            this.backToBeginning();
            for (let i = 0; i < words.length; i++) {
                this.words.push(words[i]);
            }
        },
        backToBeginning () {
            this.stop();
            this.wordIndex = 0;
            this.currentWordGroup = resetText;
        },
        getNextWordGroup () {
            let group = "";
            let currentIndex = this.wordIndex;
            let maxNextIndex = Math.min(currentIndex + this.wordsPerGroup, this.words.length);
            let maxCharLength = 4 * this.wordsPerGroup;

            while (this.wordIndex < maxNextIndex && group.length <= maxCharLength) {
                group += this.words[this.wordIndex] + " ";
                this.wordIndex++;

            }
            if (this.wordIndex >= this.words.length) {
                this.stop();
            }
            return group;
        },
    }
}
</script>
<style lang="scss">
.tachistoscope-reader {
    .reading-box {
        border-style : solid;
        background-color: #f2dcb1;
        border-radius: 10px;
        border-color: #be8f3c;
        border-width: 1px;
        box-shadow: 5px 5px 5px darkgray;
        text-align:center;
        margin-bottom: 15px;
        .reading-line {
            font-family:'Times New Roman', Times, serif;
            font-size: 19pt;
        }

    }
    .alert {
        padding-top:0px;
        padding-bottom:0px;
        text-align: center;
    }
    .btn {
        margin: 5px;
        padding:5px;
        padding-left:10px;
        padding-right:10px;
    }
}
</style>