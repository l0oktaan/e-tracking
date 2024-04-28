<template>
  <div class="mybox">   
    <div class="content">
        <v-data-table
            :headers="headers"
            :items="work_list"
            :items-per-page="15"
            
            loading-text="Loading... Please wait"
            class="elevation-1"
            :search="search"
            >
            <template v-slot:top>
                <v-toolbar
                    flat
                >
                    <v-toolbar-title>
                    <v-icon large>mdi-stack-exchange</v-icon>
                    รายการงาน</v-toolbar-title> 
                    <v-btn
                    class="ma-2"
                    rounded
                    color="success"
                    @click="create_work"
                    >
                    <v-icon left>
                        mdi-plus
                    </v-icon>
                    เพิ่มรายการใหม่
                    </v-btn>  
                    
                    <v-spacer></v-spacer>        
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="ค้นหา"
                        single-line
                        hide-details
                    ></v-text-field>          
                </v-toolbar>

            </template>            
            
            
            <!-- <template v-slot:[`item.status`]="{ item }">
                <v-progress-circular
                    size=20
                    :value="(item.status/8)*100"
                    :color="getProgress(item.status)"
                ></v-progress-circular>
                    {{ getStatus(item.status) }}
                
            </template> -->
            <template v-slot:[`item.created_date`]="{ item }">
                
                    {{ getThaiDate(item.created_date) }}
                
            </template>
            <template v-slot:[`item.due_date`]="{ item }">
                
                {{ getThaiDate(item.due_date) }}
            
            </template>
            
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon                    
                    class="mr-2"
                    large
                    color="primary"
                    @click="editItem(item.id)"
                >
                    mdi-pencil-circle
                </v-icon>
                <v-icon  
                    :disabled = "item.status > 1"
                    color="error"        
                    @click="deleteItem(item.id)"
                >
                    mdi-delete
                </v-icon>
            </template>
            
                            
            
        
        </v-data-table>
    </div> 
  </div>
</template>

<script>
export default {
    data: () => ({
        headers: [
            { text: 'วันที่จัดทำ', value: 'created_date', class: ['blue darken-3', 'white--text'],width: '10%'},
            
            {
                text: 'เลขที่เอกสาร',
                align: 'start',
                // sortable: false,
                value: 'book_no',
                class: ['blue darken-3', 'white--text', 'head-text'],
                width: '13%'
            },
            { text: 'เรื่อง', sortable: false, value: 'name', class: ['blue darken-3', 'white--text'],width: '30%'},
                
                
            { text: 'หน่วยงานต้นเรื่อง', sortable: true, value: 'depart_id', class: ['blue darken-3', 'white--text'],width: '10%'},  
            { text: 'กำหนดเสร็จ', value: 'due_date', class: ['blue darken-3', 'white--text'],width: '10%'},     
            { text: 'สถานะ', sortable: true, value: 'status', class: ['blue darken-3', 'white--text'],width: '10%'},      
            { text: 'Action', value: 'actions',class: ['blue darken-3', 'white--text'],width: '15%'}                        
                        
        ],
        search: '',
        work_list: [
            {
                "id": "1",
                "created_date": "2024/4/23",
                "name": "ขอความอนุเคราะห์เปิดระบบป้องกันการรับส่งข้อมูลผ่านระบบเครือข่าย (Firewall)",
                "depart_id": "4032",
                "book_no": "กค 0403.2/000085",
                "book_date": "2024/4/26",  
                "type" : "1",              
                "due_date": "2024/5/31",
                "status": "1"
                            
            },
            {
                "id": "2",
                "created_date": "2024/4/23",
                "name": "ขอเข้าพื้นที่ศูนย์คอมพิวเตอร์หลักของกรมบัญชีกลาง (Data Center) จังหวัดปทุมธานี",
                "depart_id": "4032",
                "book_no": "กค 0417.7/000825",
                "book_date": "2024/4/26",
                "type" : "1",
                "due_date": "2024/5/31",
                "status": "1"
                            
            }
        ]
    }),
    methods:{
        create_work(){

        },
        getThaiDate(item){
            if (item){
                var d = new Date(item);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
            }else{
                return "";
            }            
        },
    }
    
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
</style>

