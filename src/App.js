import './App.css';
import useInterval from './Hooks'
import company from './img/company1.png'
import company2 from './img/company2.png'
import company3 from './img/company3.png'
import company4 from './img/company4.png'
import company5 from './img/company5.png'
import company_fail from './img/company-fail.png'
import company_end from './img/endimage.png'
import { useState, useRef} from 'react';
import start from './img/start.png'
import { BrowserRouter, Route, Switch,Link} from 'react-router-dom';
function App() {
  
  const [difficult,setdifficult] = useState('');
  const [checkdft,setcheckdft] = useState(0);
  const [money,setmoney] = useState(0)  
  const [worker,setworker] = useState(5)
  const [maxworker,setmaxworker] = useState(10)  
  const [companylevel,setcompanylevel] = useState(1)  
  const [levelprice,setlevelprice] = useState(10000)  
  const [workerprice,setworkerprice] = useState(10000)
  const end = useRef(0)
  const givemoney = useRef(0)
  const [second,setsecond] = useState(0)  
  const [image,setimage] = useState(company)
  const [play,setplay] = useState(0)
  const [rep,setrep] = useState(0)
  const [warnning,setwarnning] = useState(0)
  const [subsecond,addsubsecond] = useState(0)

  function ez(){
    if(checkdft===0){
      setdifficult(difficult+'쉬움');
      setcheckdft(checkdft+1) 
    }
    else{
      alert('난이도 변경 불가능 합니다. 바꾸고 싶으시다면 새로고침 한 후 처음부터 다시 시작하세요^^')
    }
  }
  function hd(){
    if(checkdft===0){
      setdifficult(difficult+'어려움');
      setcheckdft(checkdft+2)
    }
    else{
      alert('난이도 변경 불가능 합니다. 바꾸고 싶으시다면 새로고침 한 후 처음부터 다시 시작하세요^^')
    }
  }
  function is_correct(){
    if(checkdft===0){
      window.location.replace("/")
    }
  }
  function addworker(){
    if(money-workerprice<0){
      return alert("돈이 부족합니다.")
    }
    if(maxworker===worker){
      return alert("인원수가 한계에 도달하였습니다.")
    }
    setmoney(money-workerprice);
    setworker(worker+1)
  }
  function companyupgrade(){
    if(companylevel===100){
      return alert("더 이상 업그레이드가 불가합니다.")
    }
    if(levelprice>money){
      return alert("돈이 부족합니다.")
    }
    setmoney(money-levelprice)
    setmaxworker(maxworker+5)
    setlevelprice(levelprice+5000)
    setcompanylevel(companylevel+1)
    setworkerprice(workerprice+10000)
  }
  function repair(){
    if(warnning===0){
      return alert('건물이 멀쩡합니다.')
    }
    if(rep>money){
      return alert('돈이 부족합니다.')
    }
    setrep(0)
    setimage(company)
    setmoney(money-rep)
    setplay(0)
    setwarnning(0)
    alert('건물 수리 완료')
  }
  function giveup(){
    window.location.replace("/");
  }
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/difficulty">
          <div className="App">
            <div className="position">
              <h1>
                난이도를 선택하세요
              </h1>
              <h2>
                쉬움 :5억원에서 시작<br></br>천재지변이 일어나지 않음
              </h2>
              <h2>
              어려움 : 0원에서 시작
              </h2>
              <Link to='/play'><button className='easy' onClick={ez}>쉬움</button></Link>
              
            </div>
            <div className='position'>
              <Link to='/play'><button className='hard' onClick={hd}>어려움</button></Link>
            </div>
          </div>
        </Route>
        <Route path='/play'>
          <Play />
        </Route>
        <Route path='/fail'>
          <div className="App">
            <div className="position">
              <h1>
                실패하였습니다.ㅠㅠ
              </h1>
              <img class="size" src={company_fail} alt="campany_fail"/>
            </div>
            <div className="position">
              <Link to='/'><button className='giveupbutton' onClick={giveup}>다시하기</button></Link>
            </div>
          </div>
        </Route>
        <Route path='/end'>
          <End />
        </Route>
      </Switch>
    </BrowserRouter>
  );
  function End(){
    if(end.current===0){
      return(
        <div className='position'>
          <h1>
            당신은 현재 클리어를 할 수 없습니다.<br></br>10억을 모으세요.
          </h1>
          <img class="size" src={company_fail} alt="campany_fail"/>
          <div>
          <Link to='/play'><button className='hard'>돌아가기</button></Link>
          </div>

        </div>
      )
    }
    else{
      const minute = parseInt(second / 60)
      const hour = parseInt(minute/60)
      return(
        <div className='position'>
          <h1>
            축하합니다!<br></br>
            당신은 이 게임을<br></br>
            클리어하셨습니다.<br></br><br></br>
            난이도 : {difficult}<br></br>
            {hour} : {minute%60} : {second%60}
          </h1>
          <img class="size" src={company_end} alt="campany_fail"/>
          <h1>
            개발자 기록<br></br>쉬움 : 0:0:24<br></br>어려움 : 0:1:39
          </h1>
        </div>
      )
    }
  }
  function Play(){
    is_correct();
    if(checkdft===1&&givemoney.current===0){
      setmoney(money+500000000)
      givemoney.current+=1
    }
    
    useInterval(() => {
      if(play===0){
        setmoney(money+(100000*worker))
        setsecond(second+1)
        addsubsecond(subsecond+1)
        if(money>=1000000000){
          end.current += 1
          setplay(1)
          return alert('축하합니다. 10억을 모으셨습니다. 이제 클리어를 할 수 있습니다!')
        }

        if(subsecond===20){
          if(checkdft===2){
            addsubsecond(subsecond-20)
            const randomNum = Math.floor(Math.random() * 6 + 1);
            const Size = Math.floor(Math.random() * 10 + 1);
            setwarnning(1)
            if(randomNum===1){
                alert("해일이 일어났습니다. 회사를 고치지 않으면 돈을 벌 수 없습니다. 강도 : "+Size)
                setimage(company5)
                setplay(1)
                setrep(1000000*companylevel*randomNum*Size)
            }
            else if(randomNum===2){
                alert("붕괴가 일어났습니다. 회사를 고치지 않으면 돈을 벌 수 없습니다. 강도 : "+Size)
                setimage(company4)
                setplay(1)
                setrep(1000000*companylevel*randomNum*Size)
            }
            else if(randomNum===3){
                alert("화재가 일어났습니다. 회사를 고치지 않으면 돈을 벌 수 없습니다. 강도 : "+Size)
                setimage(company3)
                setplay(1)
                setrep(1000000*companylevel*randomNum*Size)
            }
            else if(randomNum===4){
                alert("폭발이 일어났습니다. 회사를 고치지 않으면 돈을 벌 수 없습니다. 강도 : "+Size)
                setimage(company2)
                setplay(1)
                setrep(1000000*companylevel*randomNum*Size)
          }
        }
      }
    }
    },1000
    )
    return(
        <div className="App">          
          <div className="position">
              <h1>난이도 : {difficult}</h1>
              <img class="size" src={image} alt="campany"/>
              <h3>돈 : {(money)}/10억 원</h3>
              <h2>회사원 : {(worker)}/{(maxworker)}명</h2>
              <h2>회사 레벨 : {(companylevel)}LV</h2>
              <button className='upgradecompany' onClick={companyupgrade}>회사 업그레이드<br></br>비용 : {(levelprice)}원</button>
              <button className='addworker' onClick={addworker}>회사원 추가<br></br>비용 : {(workerprice)}원</button>
              <button className='repairbutton' onClick={repair}>수리하기<br></br>비용 : {rep}원</button>
              <Link to='/end'><button className='endingbutton'>클리어 하기<br></br>10억원</button></Link>
              <Link to='/fail'><button className='exitbutton' onClick={<Link to='/fail'></Link>}>포기하기<br></br>ㅠㅠ</button></Link>
              <h4>10억을 모으면 게임이 끝납니다.<br></br>참고로 저장 안 됩니다.</h4>
            </div>
       </div>
    )
  }
  function Main(){
    return(
      <div className="App">
            <div className="position">
              <h1>
                회사를 키워 돈을 벌자!
              </h1>
              <img class="size" src={company} alt="campany"/>
            </div>
            <div className="position">
              <Link to="/difficulty"><img class="startbutton" src={start} alt="startbutton" /></Link>
            </div>
            
          </div>
    )
  }
}

export default App;
