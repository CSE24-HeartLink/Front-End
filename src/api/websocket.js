// api/websocket.js
import Constants from 'expo-constants'
import { navigationRef } from '../components/navigation/RootNavigation';

const WS_URL = Constants.expoConfig.extra.apiUrl.development.replace('http', 'ws')

export const nuguApi = {
    socket: null,
    subscribers: new Set(),
    currentScreen: null,
    currentWritingData: null, // 현재 작성 중인 데이터 저장

    initializeSocket() {
        if (this.socket && this.socket.readyState === 1) return;

        this.socket = new WebSocket(`${WS_URL}/api/nugu/websocket`);
        
        this.socket.onopen = () => {
            console.log("웹소켓 연결됨");
        };
        
        this.socket.onmessage = (event) => {
            console.log("수신된 데이터:", event.data);
            
            try {
                const data = JSON.parse(event.data);
                
                if (data.type === "TEST_CONNECTION") return;

                this.subscribers.forEach(callback => callback(data));
                
                if (data.type === "VOICE_COMMAND") {
                    console.log("음성 명령 수신됨:", data.command);
                    
                    switch(data.command) {
                        case "피드 음성인식 켜줘":
                            if (navigationRef.current?.isReady()) {
                                navigationRef.current.navigate('RecordScreen');
                            }
                            break;
                            
                        case "올려줘":
                            if (this.currentScreen === 'WritingScreen' && this.currentWritingData) {
                                this.subscribers.forEach(callback => 
                                    callback({
                                        type: "TRIGGER_SEND_POST",
                                        data: this.currentWritingData // 현재 작성 중인 데이터 전달
                                    })
                                );
                                console.log("게시글 업로드 트리거 전송됨", this.currentWritingData);
                            }
                            break;
                    }
                }
            } catch (error) {
                console.error("데이터 파싱 오류:", error);
            }
        };
        
        this.socket.onerror = (error) => {
            console.error("웹소켓 오류:", error);
        };
        
        this.socket.onclose = () => {
            console.log("웹소켓 연결 종료");
            setTimeout(() => this.initializeSocket(), 3000);
        };
    },

    setCurrentScreen(screenName) {
        this.currentScreen = screenName;
    },

    // 현재 작성 중인 데이터 업데이트
    updateWritingData(data) {
        this.currentWritingData = data;
        console.log("작성 데이터 업데이트됨:", data);
    },

    subscribe(callback) {
        this.subscribers.add(callback);
        if (!this.socket || this.socket.readyState !== 1) {
            this.initializeSocket();
        }
        return () => {
            this.subscribers.delete(callback);
            if (this.subscribers.size === 0 && this.socket) {
                this.socket.close();
                this.socket = null;
            }
        };
    },

    subscribeToImageGeneration(onImageGenerated) {
        return this.subscribe((data) => {
            if (data.type === "AI_IMAGE_GENERATED") {
                onImageGenerated(data);
            }
        });
    }
};