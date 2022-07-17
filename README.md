> ## jsconfig.json 설정

탭이 열려있지 않고 닫혀 있는 파일에도 import 자동 완성이 작동하게 하려면  
jsonconfig.json 파일을 생성하고 `Ctrl` + `Space` 을 누른다.  
아래와 같이 설정이 자동 완성되어 나온다.
```json
{
    "compilerOptions": {
        "target": "es2020"
    }
}
```
설정을 마치고 나면 불러오려는 컴포넌트 파일이 열려 있지 않아도  
자동 완성을 통해 컴포넌트를 불러와서 사용할 수 있다.