<template>
    <div class="mybox">   
        <div class="content">
            <v-data-table
                :headers="headers"
                :items="operators"
                :items-per-page="15"                
                loading-text="Loading... Please wait"
                class="elevation-1"                
                >
                <template v-slot:[`item.order`]="{ index }">                
                    {{ index+1 }}
                </template>
                <template v-slot:[`item.todo`]="{ item }">                
                    {{ getTodo(item.id) }}
                </template>
                <template v-slot:[`item.progress`]="{ item }">                
                    {{ getProgress(item.id) }}
                </template>
                <template v-slot:[`item.done`]="{ item }">                
                    {{ getDone(item.id) }}
                </template>
                <template v-slot:[`item.due`]="{ item }">                
                    {{ getDue(item.id) }}
                </template>
                <template v-slot:[`item.status`]="{ item }">                
                    {{ getStatus(item.id) }}
                </template>
            </v-data-table>
        </div>        
    </div>
</template>
<script>
export default {
    data: () => ({
        headers: [
            { text: 'ลำดับที่', value: 'order', class: ['blue darken-3', 'white--text'],width: '5%'},
            { text: 'ชื่อ-นามสกุล', value: 'name', class: ['blue darken-3', 'white--text'],width: '20%'},          
            { text: 'Todo', sortable: false, value:'todo', class: ['blue darken-3', 'white--text'],width: '10%'},
            { text: 'InProgress', sortable: false, value:'progress', class: ['blue darken-3', 'white--text'],width: '10%'},
            { text: 'Done', sortable: false, value:'done', class: ['blue darken-3', 'white--text'],width: '10%'},
            { text: 'กำหนดเสร็จ', sortable: false, value:'due', class: ['blue darken-3', 'white--text'],width: '10%'},
            { text: 'สถานะ', sortable: false, value:'status', class: ['blue darken-3', 'white--text'],width: '7%'},
        ],
        operators: [
            {
                id: 1,
                name: 'กลุ่มงานรักษาความปลอดภัยด้านสารสนเทศ',
                type: 1
            },
            {
                id: 2,
                name: 'นายทรงวุฒิ สัจจบุตร',
                type: 2
            },
        ],
        tasks:[
            {
                id:1,
                due_date: '2024-06-07'
            }
        ],
        task_status: [
            {
                id: 1,
                operator_id: 1,
                task_id: 1,
                todo_date_time: '2024-04-15 14:20:00',
                inprogress_date_time: '2024-05-17 12:30:00',
                done_date_time: '2024-06-07 09:30:00',
                status: 1
            },
            {
                id: 2,
                operator_id: 2,
                task_id: 1,
                todo_date_time: '2024-04-15 14:20:00',
                inprogress_date_time: '2024-05-17 12:30:00',
                done_date_time: '',
                status: 2
            }
        ],        
    }),
    methods: {
        getTodo(id){
            let item = this.task_status.find(x=>x.operator_id==id)            
            if (item){                
                return this.getThaiDateTime(item.todo_date_time)
            }else{
                return ''
            }
        },
        getProgress(id){
            let item = this.task_status.find(x=>x.operator_id==id)            
            if (item){                
                return this.getThaiDateTime(item.inprogress_date_time)
            }else{
                return ''
            }
        },
        getDone(id){
            let item = this.task_status.find(x=>x.operator_id==id)            
            if (item){                
                return this.getThaiDateTime(item.done_date_time)
            }else{
                return ''
            }
        },
        getDue(id){
            let item = this.task_status.find(x=>x.operator_id==id)            
            if (item){ 
                let task = this.tasks.find(x=>x.id==item.task_id)
                return this.getThaiDate(task.due_date)
            }else{
                return ''
            }
        },
        getStatus(id){
            let item = this.task_status.find(x=>x.operator_id==id)            
            if (item){                
                return item.status == 1 ? 'ปกติ' : 'ล่าช้า'
            }else{
                return ''
            }
        },
        getThaiDateTime(item){
            if (item){
                var d = new Date(item);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' + d.toLocaleTimeString('th-TH');
            }else{
                return "";
            }            
        },
        getThaiDate(item){
            if (item){
                var d = new Date(item);
            return d.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
            }else{
                return "";
            }            
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
    </style>