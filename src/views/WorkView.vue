<template>
    <div class="mybox">
      <!-- <v-tabs      
          v-model="tab"
        
        centered
        
        icons-and-text
        grow
      >
        
  
        <v-tab href="#tab-1">
          รายละเอียดงาน
          
        </v-tab>
  
        <v-tab href="#tab-2" >
          การมอบหมายงาน
          
        </v-tab>
  
        <v-tab href="#tab-3" >
          การติดตามงาน
          
        </v-tab>
      </v-tabs>
  
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-1">
          <work-form></work-form>
        </v-tab-item>
      </v-tabs-items>
      <v-tabs-items v-model="tab">
          <v-tab-item value="tab-2">
              <work-assign></work-assign>
          </v-tab-item>
      </v-tabs-items>
      <v-tabs-items v-model="tab">
          <v-tab-item value="tab-3">
              <work-status></work-status>
          </v-tab-item>
      </v-tabs-items>     -->
      <v-stepper v-model="el" width="90%" alt-labels non-linear>
        <v-stepper-header>
            <v-stepper-step
            editable    
                step="1"
            >
                รายละเอียดงาน
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step
                editable
                step="2"
            >
                การมอบหมายงาน
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3" editable>
                การติดตามงาน
            </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
        <v-stepper-content step="1">
            <work-form :work-status="work-status" @workUpdate="workUpdate"></work-form>
        </v-stepper-content>

        <v-stepper-content step="2">
            <work-assign :work-status="work-status" @workUpdate="workUpdate"></work-assign>
        </v-stepper-content>

        <v-stepper-content step="3">
            <work-status :work-status="work-status" @workUpdate="workUpdate"></work-status>
        </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
    </div>

  </template>
  
  <script>
  import axios from 'axios'
  import Swal from 'sweetalert2'
  import WorkForm from '@/components/WorkForm'
  import WorkAssign from '@/components/WorkAssign'
  import WorkStatus from '@/components/WorkStatus'
  
  export default {
  
      components: {       
          WorkAssign,
          WorkForm,
          WorkStatus   
      },
      delimiters: ['${', '}'], // Avoid Twig conflicts
      data: () => ({
          el: 1,
          book_date_menu: false,
          due_date_menu: false,
          book_date: new Date().toISOString().substr(0, 10),
          due_date: new Date().toISOString().substr(0, 10),
          rules: [v => v.length <= 500 || 'เกิน 2,500 ตัวอักษร'],
          invalid: false,
          work : {},
          file_list: [],
          documents: [],
          tab: null,
          work_status: 0
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
          workUpdate(work_id, work_status){
            this.work_status = work_status
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
      margin-top: 10px;
  }
  .content{
      width: 100%;
      padding: 10px 0 0 0;    
      
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
  .v-tab{
    font-size: 1.2rem;
  }
 .v-stepper__header{
    padding: 10px;
  }
  .v-stepper__header > .v-divider{
    margin-top: 10px!important;
  }
  </style>