<template lang="">
    <v-card
        elevation="4"
        class="mycard"
    >    
        <div class="title">การมอบหมายงาน</div>
        <v-row class="top_head">
            <v-col class="text-center pt-2"><p class="head">รายชื่อหน่วยงาน - บุคคล</p></v-col>
            
            <v-col class="text-center pt-2"><p class="head">รายชื่อหน่วยงาน - บุคคล ที่เลือก</p></v-col>
        </v-row>
        <v-row>
            <v-col class="col-left">            
                <v-treeview
                    v-model="selection"
                    :items="items"
                    selection-type="independent"
                    selectable
                    return-object      
                    dense      
                ></v-treeview>
            </v-col>
            <v-divider vertical dark></v-divider>
            <v-col
                class="pl-6"    
                cols="6"
            >            
                <template v-if="!selection.length">
                    ยังไม่มีการเลือก
                </template>
                <template v-else>
                    <div class="target_list"
                    v-for="node in selection"
                    :key="node.id"
                    >                    
                    <v-icon 
                        class="btn_deselect"
                        @click="deselect(node.id)"
                    >
                        mdi-close                            
                    </v-icon>                    
                        {{ node.name }}
                    </div>
                </template>
            </v-col>
        </v-row>
        <v-row justify="center">                            
            <v-col cols="12">
                <div class="text-center">                                                                  
                    <v-btn
                        class="ma-3"
                        rounded
                        color="primary"
                        v-if="true"
                        type="submit"
                        :disabled="false"
                    >
                        <v-icon left>
                            mdi-content-save-outline
                        </v-icon>
                        บันทึก
                    </v-btn>                               
                </div>
            </v-col>
        </v-row>
    </v-card>
</template>
<script>
export default {
    data: () => ({
      selectionType: 'leaf',
      selection: [],
      items: [
        {
          id: 1,
          name: 'กลุ่มงาน 1',
          children: [
            { id: 11, name: 'Child #1' },
            { id: 12, name: 'Child #2' },
            
          ],
        },
        {
            id: 2,
            name: 'กลุ่มงานรักษาความปลอดภัยด้านสารสนเทศ',
            children: [
            { id: 21, name: 'นายทรงวุฒิ สัจจบุตร' },
            { id: 22, name: 'Grandchild #2' },
            ],
        },
      ],
    }),
    methods: {
        deselect(id){
            let index = this.selection.findIndex(x=>x.id==id);
            console.log('id : ' + id + ' index : ' + index)
            this.selection.splice(index,1);
        }
    },
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;    
}
.mybox{
    border: 1px solid #000;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
.head{
    font-size: 1.2rem;
    margin-bottom: 5px;
}
.content{        
    padding: 10px;
    
    
}
.mycard{
    width: 100%;
    padding: 15px;        
}
.title{
    width: 100%;
    text-align: center;
    background-color: #0e4aee;
    color: #fff;
    padding: 5px;
    
}
.top_head{
    border-bottom: solid 1px #000;
}
.target_list{
    height: 40px;
}

.btn_deselect:hover{
    color: red;
}
.col-left{
    border-right: solid 1px #000;
}
</style>