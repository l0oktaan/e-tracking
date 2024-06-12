<template>
  
    <div class="content">
        <validation-observer
            ref="observer"
            v-slot="{ invalid }"            
        >
            <form @submit.prevent="submit">
                <v-card
                    elevation="1"
                    class="mycard"
                >
                    
                    <v-row>                        
                        <v-col cols="2" class="text-right pr-5">
                            <p class="topic">ชื่อเรื่อง :</p>
                        </v-col>
                        <v-col cols="10">
                            <validation-provider
                                v-slot="{ errors }"
                                name="title"
                                rules="required"
                            >
                                <v-text-field                                                                        
                                    v-model="work.title"
                                    :rules="rules"
                                    :error-messages="errors"
                                    hide-details="auto"     
                                    outlined
                                    data-vv-name="title"
                                    label="ชื่อเรื่อง"
                                ></v-text-field>                                
                            </validation-provider>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2" class="text-right pr-5">
                            <p class="topic">ประเภทหน่วยงานต้นเรื่อง :</p>
                        </v-col>     
                        <v-col cols="4">                          
                            <v-radio-group 
                                v-model="work.depart_type"
                                row
                                dense
                                mandatory                                
                            >                                
                                <v-radio
                                    label="หน่วยงานภายนอก"
                                    :value="1"
                                ></v-radio>
                            
                                <v-radio
                                    label="หน่วยงานภายในกรม"
                                    :value="2"
                                ></v-radio>                                  
                            </v-radio-group>                            
                        </v-col>
                        <v-col cols="2" class="text-right pr-5">
                            <p class="topic">ชื่อหน่วยงาน :</p>
                        </v-col> 
                        <v-col cols="4">
                            <v-combobox                                
                                label="หน่วยงาน"
                                multiple
                                outlined
                            ></v-combobox>
                        </v-col>
                    </v-row>
                    <v-row>     
                        <v-col cols="2" class="text-right pr-5">
                            <p class="topic">หนังสือ/เอกสาร :</p>
                        </v-col>        
                        <v-col cols="4">
                            <v-text-field                                    
                                
                                v-model="work.book_no"                              
                                outlined
                                data-vv-name="title"
                                label="เลขที่หนังสือ"
                                
                            ></v-text-field>
                        </v-col> 
                        <v-col cols="2" class="text-right pr-5">
                            <p class="topic">ลงวันที่ :</p>
                        </v-col>           
                        <v-col cols="4">
                            <v-menu
                                    ref="book_date_menu"
                                    v-model="book_date_menu"
                                    :close-on-content-click="false"
                                    :close-on-click="false"
                                    :return-value.sync="book_date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="200px"                                    
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field                                                        
                                            class="ml-5"
                                            v-model="getBookDate"
                                            label="หนังสือลงวันที่"                                    
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            append-outer-icon="mdi-calendar"
                                            outlined                                            
                                            @click:clear="book_date=null"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        :readonly="false"
                                        v-model="book_date"
                                        no-title
                                        scrollable
                                        locale="th-TH"
                                        >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="book_date_menu = false"
                                        >
                                            ยกเลิก
                                        </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.book_date_menu.save(book_date)"
                                        >
                                            ตกลง
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                        </v-col>
                        
                    </v-row>
                    <v-row>
                        <v-col cols="2" class="text-right pr-5">
                            <p class="topic">แจ้งเพื่อ :</p>
                        </v-col>
                        <v-col cols="4">
                            <v-radio-group 
                                v-model="work.work_type"
                                row
                                dense
                                mandatory                                
                            >                                
                                <v-radio
                                    label="เพื่อทราบ"
                                    :value="1"
                                ></v-radio>
                            
                                <v-radio
                                    label="เพื่อดำเนินการ"
                                    :value="2"
                                ></v-radio>                                  
                            </v-radio-group>
                        </v-col>
                        <v-col cols="2" class="text-right pr-5">
                            <p class="topic">กำหนดเสร็จ :</p>
                        </v-col> 
                        <v-col cols="4">
                            <v-menu
                                    ref="due_date_menu"
                                    v-model="due_date_menu"
                                    :close-on-content-click="false"
                                    :close-on-click="false"
                                    :return-value.sync="due_date"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="290px"                                    
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field                                                        
                                            class="ml-5"
                                            v-model="getDueDate"
                                            label="กำหนดวันที่แล้วเสร็จ"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            append-outer-icon="mdi-calendar"
                                            outlined                                            
                                            @click:clear="due_date=null"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                        :readonly="false"
                                        v-model="due_date"
                                        no-title
                                        scrollable
                                        locale="th-TH"
                                        >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="due_date_menu = false"
                                        >
                                            ยกเลิก
                                        </v-btn>
                                        <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.due_date_menu.save(due_date)"
                                        >
                                            ตกลง
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>    
                        <v-col cols="2" class="text-right pr-5">
                            <p class="topic">เอกสารประกอบ :</p>
                        </v-col>     
                        <v-col cols="10 mb-2">                                
                            <div class="flex items-center justify-center w-full h-screen text-center">
                                <div class="bg-gray-100" @dragover="dragover" @dragleave="dragleave" @drop="drop" style="border-radius: 5px; padding: 10px; cursor:pointer;">
                                    <input type="file" style="display: none;" multiple name="fields[assetsFieldHandle][]" id="assetsFieldHandle" 
                                    class="w-px h-px opacity-0 overflow-hidden absolute" @change="onChange" ref="file" accept=".pdf,.jpg,.jpeg,.png" />
                                
                                    <label for="assetsFieldHandle" class="block">
                                    <div  style="cursor:pointer;">
                                        <v-icon left>mdi-paperclip</v-icon> วางไฟล์ที่ต้องการ หรือ คลิก เพื่อเลือกไฟล์
                                    </div>
                                    </label>                                        
                                </div>
                            </div>
                            <v-chip                                     
                                small
                                v-for="(item,index) in file_list" 
                                :key="index"
                                class="ma-2 pa-2"                                    
                                label
                                :close="true"
                                @click="downloadFile(item)"
                                :color="item.id == 0 ? 'green' : 'primary'"    
                                @click:close="deleteFile(item,index)"
                                >
                                {{ item.file_title }}
                            </v-chip>                           
                            
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
                                    :disabled="invalid"
                                >
                                    <v-icon left>
                                        mdi-content-save-outline
                                    </v-icon>
                                    บันทึก
                                </v-btn>                                
                                <v-btn
                                    text                                    
                                    color="error"
                                >
                                    <v-icon left>
                                        mdi-arrow-u-left-top-bold
                                    </v-icon>
                                    ออก</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-card>               
            </form>
        </validation-observer>
    </div> 
     
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

import { required, max, digits, regex} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
setInteractionMode('eager')
extend('required', {
    ...required,
    message: 'กรุณาใส่ข้อมูล',
})
extend('max', {
    ...max,
    message: 'ความยาวไม่เกิน {length} ตัวอักษร',
})
extend('digits', {
    ...digits,
    message: 'ใส่ได้เฉพาะตัวเลข และจำนวน {length} หลัก',
})
extend('regex', {
    ...regex,
    message: 'รูปแบบข้อมูลไม่ถูกต้อง',
})
export default {
    props: ['work_status'],
    components: {
      
      ValidationProvider,
      ValidationObserver,
      
      
        
    },
    delimiters: ['${', '}'], // Avoid Twig conflicts
    data: () => ({
        book_date_menu: false,
        due_date_menu: false,
        book_date: new Date().toISOString().substr(0, 10),
        due_date: new Date().toISOString().substr(0, 10),
        rules: [v => v.length <= 500 || 'เกิน 2,500 ตัวอักษร'],
        invalid: false,
        work : {},
        file_list: [],
        documents: [],
        tab: null
    }),
    computed: {
        // getDocumentSize() {
        //     return this.work ? this.documents.length : 0;
        // },
        getBookDate(){
            var d = new Date(this.book_date);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
            //return moment(String(value)).format('LL')
        },
        getDueDate(){
           
                var d = new Date(this.due_date);
                return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' });
            
            
            
            //return moment(String(value)).format('LL')
        },
    },
    methods: {
        workUpdate(status){
            this.$emit("workUpdate",1, status)
        },
        async deleteFile(item,index) {
      // Prompt here with text if required
            // this.form_edit.document_relate.splice(index, 1)
            // this.form_edit.document_files.splice(index, 1)
            if (item.id == 0){
                this.file_list.splice(index,1);
            }else{
                Swal.fire({
                    title: "กรุณายืนยันการลบรายการจากฐานข้อมูล",                
                    icon: "warning",
                    allowOutsideClick: false,
                    showCancelButton: true,
                    confirmButtonText: `ยืนยัน`,
                    cancelButtonText: `ยกเลิก`,
                    }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        this.delFile(item.id);
                    } else if (result.isDenied) {
                        // Swal.fire('Changes are not saved', '', 'info')
                    }
                })
                
                
            }
        },
        downloadFile(item){
            if (item.id !=0 ){
                let path = `/api/request_forms/${this.request_id}/request_files/${item.id}`;
                axios({
                    url : `${path}`,
                    methods : 'GET',
                    responseType : 'blob'
                })
                .then(response=>{
                    var fileURL = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
                    
                    var fileLink = document.createElement('a');
                    fileLink.href = fileURL;
                    let filename = item.file_title;
                    fileLink.setAttribute('download', filename);
                    document.body.appendChild(fileLink);
                    window.open(fileLink, "_blank");
                    // fileLink.click();               
                })
                .catch(error=>{
                    console.log(error);
                })
            }
        },
        onChange() {
            let files = [...this.$refs.file.files];
            if (files){
                for (let i=0;i<files.length;i++){
                    
                    if (files[i].type === 'image/jpeg' || files[i].type === 'image/png' || files[i].type === 'application/pdf'){
                        // this.document_files.push(files[i]);
                        // this.form_edit.document_relate.push(files[i].name);
                        let file = {
                            id:0,
                            file_title: files[i].name,
                            file_content: files[i]
                        }
                        this.file_list.push(file);                        
                    }
                }              
                
            }
        },
        dragover(event) {
            event.preventDefault();
            // Add some visual fluff to show the user can drop its files
            if (!event.currentTarget.classList.contains('bg-green-300')) {
                event.currentTarget.classList.remove('bg-gray-100');
                event.currentTarget.classList.add('bg-green-300');
            }
        },
        dragleave(event) {
            // Clean up
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
        drop(event) {
            event.preventDefault();
            this.$refs.file.files = event.dataTransfer.files;
            this.onChange(); // Trigger the onChange event manually
            // Clean up
            document.getElementById('assetsFieldHandle').value= null;          
            
            
            event.currentTarget.classList.add('bg-gray-100');
            event.currentTarget.classList.remove('bg-green-300');
        },
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
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;    
}
.content{
    width: 100%;
    padding: 10px;    
    
}
.mycard{
    padding: 15px;
}

.upload-btn{
    margin-top: 10px!important;
    font-size: 0.9em!important;
    padding-left: 5px!important;
}
.upload-btn > .v-btn__content{
    padding-top: 10px!important
}
.bg-gray-100{
    background-color: #c5c5c5;
    border: 1px solid #c5c5c5;
}
.bg-green-300{
    background-color: #7ace79; 
    border: 1px solid #c5c5c5;  
    
}
.v-carousel .v-window-item {
  position: absolute;
  top: 0;
  width: 100%;
}

.v-tabs-items{
    width: 100%;
}
</style>