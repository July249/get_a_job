## SSR과 CSR

### SSR

SSR(Server-Side-Rendering)은 서버 측에서 초기 HTML을 완전히 렌더링하여 클라이언트에 보내는 방식이다.  
![ssr](https://www.growth-rocket.com/wp-content/uploads/2020/07/Server-Side-Rendering-Flowchart.jpg)

### CSR

CSR(Client-Side-Rendering)은 초기 HTML 파일을 서버로부터 받은 후, 자바스크립트를 사용하여 동적으로 콘텐츠를 렌더링하는 방식이다.
![CSR](https://www.growth-rocket.com/wp-content/uploads/2020/07/Client-Side-Rendering-Flowchart.jpg)

### SSR VS CSR

- 초기 로딩 속도  
  SSR은 서버에서 완전한 HTML을 생성하여 클라이언트로 전달하기 때문에 초기 로딩 속도가 빠르다.  
  CSR은 초기 요청에 HTML파일을 받은 후 자바스크립트 파일을 다운로드한 후 클라이언트측에서 렌더링하기 때문에 초기 로딩 속도가 느릴 수 있다.
- 검색 엔진 최적화(SEO)
  SSR은 서버에서 전체 페이지를 렌더링하여 HTML을 생성하기 때문에 검색 엔진이 콘텐츠를 크롤링하고 인덱싱하기 용이하다.
  CSR은 초기 요청에 비어있는 HTML을 받고 자바스크립트를 통해 동적으로 콘텐츠를 생성하기 때문에 SEO에 어려움이 있을 수 있다.
- 서버 자원 사용
  SSR은 매번 서버에 요청을 보내기에 서버 자원을 많이 사용한다.
  CSR은 클라이언트에서 자원을 많이 사용하므로 서버에 부하가 적다.
