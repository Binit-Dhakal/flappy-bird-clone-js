const canvas=document.querySelector('canvas');
const ctx=canvas.getContext('2d')

const height=canvas.height;
const width=canvas.width;

const base_img=new Image();
const bird_img=new Image();
const back_img=new Image();
const shaft_img=new Image();
const head_img=new Image();


base_img.src='static/Images/base.png';
bird_img.src='static/Images/bird_u.png';
shaft_img.src='static/Images/shaft.png';
head_img.src='static/Images/pipehead.png';
back_img.src='static/Images/back1d.png';


back_img.onload=()=>{
    let score=0;
    let game_state=0;
    const gap=150;
    const gravity=0.5;
    
    function random(min,max){
        return (Math.floor(Math.random()*(max-min+1))+min);
    }

    class Bird{
        constructor(sy){
            this.sy=sy;
            this.dx=100;
            this.gravity=gravity;
            this.velocity=0;
            this.flap=false;
            this.flapping=0;
        }

        draw(){
            ctx.drawImage(bird_img,this.dx,this.sy,bird_img.width,bird_img.height);
        }

        up(){
            this.flap=true;
        }

        update(){
            if(this.flap){
                this.flapping=-8;
                this.flap=false;
                this.velocity=this.gravity+this.flapping;
            
            }else{
                this.flapping=0;
                this.velocity+=this.gravity+this.flapping;
            }

            // this.velocity+=this.gravity+this.flapping;
            this.sy+=this.velocity;
        }
    }

    document.addEventListener('keypress',flap);

    function flap(e){
        if (e.key==='w'){
            bird.up();
        }    
    }
    class Pipe{
        constructor(x_pos){
            this.dx=x_pos;
            this.dh=random(50,250);
        }

        draw(){
            ctx.drawImage(shaft_img,
                // ---selection--
                0,0,shaft_img.width,shaft_img.height,
                //----drawing------
                this.dx,0,shaft_img.width,this.dh
                )
            
            ctx.drawImage(head_img,
                //---selection---
                0,0,head_img.width,head_img.height,
                //-----drawing------
                this.dx-1,this.dh,head_img.width,head_img.height)
            
            ctx.drawImage(shaft_img,
                //-----selection-----
                0,0,shaft_img.width,shaft_img.height,
                //-----drawing-------
                this.dx,this.dh+gap+head_img.height,shaft_img.width,((height-100)-this.dh-head_img.height-gap)
                )

            ctx.drawImage(head_img,
                ///------selection-----
                0,0,head_img.width,head_img.height,
                //-------drawing-------
                this.dx-1,this.dh+gap,head_img.width,head_img.height
                )
        }
    
    };  
    //Sprites is a computer graphics concept where graphics may be moved on screen and otherwise manipulated as a single entity
    class Base{
        constructor(lx){
            this.lx=lx
        }

        draw(){
            ctx.drawImage(base_img,
                0,0,base_img.width,base_img.height,
                this.lx,500,width+50,100)
        }
    }   

    bird=new Bird(100);
    base=new Base(0)

    

    function main(){
        ctx.drawImage(back_img,0,0,width,height);
        bird.draw();
        for(let i=0;i<pipes_array.length;i++){
            pipes_array[i].dx-=2;
            pipes_array[i].draw();
            
            if (pipes_array[i].dx===420){
                pipes_array.push(new Pipe(width))
            }

            if(pipes_array[i].dx===-60){
                pipes_array.shift();
            }
            
            //collision
            if((pipes_array[i].dx<=(bird.dx+bird_img.width)) && (pipes_array[i].dx+head_img.width>=bird.dx)){
                if(!((bird.sy>pipes_array[i].dh+head_img.height)&&((bird.sy+bird_img.height)<(pipes_array[i].dh+gap+head_img.height)))){
                    // state=GameOver();
                    game_state=0;
                    console.log('crashed');
                    
                }
            }
            if(pipes_array[i].dx===40){
                score++;
            }
        }
        
        
            //up down collision
        if ((bird.sy+bird_img.height>height-100) || bird.sy<0){
            bird.sy=100;    
            bird.velocity=0;
        }

        base.draw();
        base.lx-=2;
        
        bird.update();
        if(base.lx<-50){
            base.lx=0;
        }
        
        ctx.fillStyle='#000';
        ctx.font='20px Verdana';
        ctx.fillText('Score:'+score,10,height-20);
        
        if(game_state===1){
            requestAnimationFrame(main)
        }else{
            GameOver();
        }

    }
    let pipes_array;
    pipes_array=[];
    game_state=1;
    pipes_array.push(new Pipe(width))
    
    function GameOver(){
        score=0;
        playerchoice=prompt('Wanna Play Again????');
        if(playerchoice==='1'){
            pipes_array=[];
            game_state=1;
            pipes_array.push(new Pipe(width))
            main();
        }else{
            location.reload();
        }
    }


    main()
    

}