import { render } from "@testing-library/react";
import { Button, Flex, Table } from "antd";
import { useMemo, useState } from "react";
import Charts from "./Charts";
import styles from "./index.module.less";

const user = localStorage.getItem('username');
type dataType = { id: string, project: string, overtime: boolean, hours: number, created_at: string }
export default function List() {
  const [data, setData] = useState<dataType[]>(
[{
    "id": "001",
    "project": "Road Project A",
    "overtime": true,
    "hours": 3.5,
    "created_at": "2024-04-10 10:30"
  },
  {
    "id": "002",
    "project": "Bridge Maintenance B",
    "overtime": false,
    "hours": 2,
    "created_at": "2024-04-09 13:00"
  },
  {
    "id": "003",
    "project": "Pipeline Fix C",
    "overtime": true,
    "hours": 4.5,
    "created_at": "2024-04-08 08:00"
  },
  {
    "id": "004",
    "project": "Bridge Maintenance B",
    "overtime": true,
    "hours": 3,
    "created_at": "2024-04-07 16:45"
  },
  {
    "id": "005",
    "project": "Tunnel Cleaning D",
    "overtime": false,
    "hours": 8.1,
    "created_at": "2024-04-03 11:43"
  }]

  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Project',
      dataIndex: 'project',
      key: 'project',
    },
    {
      title: 'Overtime',
      dataIndex: 'overtime',
      key: 'overtime',
      render: (text:boolean) => {
        return text ? "Yes" : "No"
      }
    },
    {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
    },
    {
      title: 'Created At	',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Action',
      render:user === 'admin'?  (item:dataType)=>{
        
        return (
          <Button onClick={()=>handleDelete(item)} type="primary">Delete</Button> 
        )
      }:undefined
    }
  ];

    const filteredColumns = columns.filter(column => column.title!== 'Action' || (column.title === 'Action' && column.render!== undefined));

  const handleDelete = (element:dataType)=>{
    const newData = data.filter(item=>element.id !== item.id)
    setData(newData)
  }

  const handleData = useMemo(()=>{
    
    return {
      hours: data.map((item)=>item.hours),
      type: data.map(item=>item.project)
    }
  },[data])


  return <div className={styles.container}>

<div className={styles.t}>
        <Table dataSource={data} columns={filteredColumns} /></div>
        <Charts data={handleData} />
  </div>;
}