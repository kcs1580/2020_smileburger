Hello. This is my first Project in SSAFY

aws에서 프로젝트 실행하는 법

putty로 aws 계정에 퍼블릭키로 로그인

~/project/s02p13c103/ 로 이동

/web 에서 sudo nohup npm start & (백그라운드에서 프론트엔드 서버실행 터미널 닫아도 계속 돌아감)
or npm start 그냥 실행 (터미널 닫으면 종료됨)

/server 에서 sudo nohup node server & (백그라운드에서 백엔드 서버실행)
or node server 그냥 실행 (터미널 닫으면 종료됨)

백그라운드에서 실행중인 프로세스 종료하는 법
ps -ef | grep npm (npm 이 들어간 명령어가 실행중인지 확인하고 pid (맨 왼쪽 숫자 )확인)
sudo kill -9 pid ( pid 프로세스 종료)


백그라운드에서 실행중인 프로세스 종료하는 법
ps -ef | grep node (node가 들어간 명령어가 실행중인지 확인 pid숫자 확인)
sudo kill -9 pid ( pid 프로세스 종료)

sudo rm -rf 폴더or파일이름 (폴더나 파일삭제)