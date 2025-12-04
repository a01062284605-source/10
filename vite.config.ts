import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 현재 디렉토리의 환경 변수 로드 (Vercel 환경 변수 포함)
  const env = loadEnv(mode, '.', '');
  
  return {
    plugins: [react()],
    define: {
      // 코드 내의 process.env.API_KEY를 실제 환경 변수 값으로 대체
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    }
  }
})