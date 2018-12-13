import {Router,Request,Response} from 'express';
import MySQL from '../mysql/mysql';

const router=Router();

router.get('/heroes',(req:Request,res:Response)=>{
    const query=`
    SELECT * FROM heroes`;
    MySQL.ejecutarQuery(query,(err:any,heroes:Object[])=>{
    
        if(err)
        {
            res.status(400).json({
                ok:false,
                err
            });
        }else{
            res.json({ok:true,heroes});
        }

    });

});



router.get('/heroes/:id',(req:Request,res:Response)=>{
    const id=req.params.id;
    const escapedId=MySQL.instance.cnn.escape(id);
    const query=`
    SELECT * from heroes WHERE id= ${escapedId}`;
    MySQL.ejecutarQuery(query,(err:any,heroes:Object[])=>{
    
        if(err)
        {
            res.status(400).json({
                ok:false,
                err
            });
        }else{
            res.json({ok:true,heroes:heroes[0]});
        }
    });

    

});


export default router;