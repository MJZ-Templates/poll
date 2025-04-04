## 📊 Real-time Polling App with Spring Boot & React
* Built with Spring Boot 3.4.4 and Amazon Corretto 21
* Create and share polls easily – votes are reflected in real-time with bar charts!
* ✨ Real-time vote updates – Live synchronization using WebSocket (STOMP)
* 📊 Bar chart visualization – Instantly see vote results as dynamic charts
* 🔗 Sharable poll links – Each poll generates a unique URL for easy sharing
* ⚡ Quick-start project structure – Clean domain/service/controller setup

## 📂 Project Structure
front
```
.
|-- eslint.config.js
|-- index.html
|-- package-lock.json
|-- package.json
|-- public
|   `-- vite.svg
|-- src
|   |-- App.css
|   |-- App.jsx
|   |-- assets
|   |   `-- react.svg
|   |-- components
|   |   |-- PollBarChart.jsx
|   |   `-- PollViewer.jsx
|   |-- constants
|   |   `-- chartColors.js
|   |-- hooks
|   |   `-- useLocalStorage.js
|   |-- index.css
|   |-- main.jsx
|   |-- pages
|   |   |-- CreatePollPage.jsx
|   |   `-- PollDetailPage.jsx
|   `-- services
|       |-- api.js
|       `-- socket.js
`-- vite.config.js
```

back
```
.
|-- build.gradle
|-- gradle
|   `-- wrapper
|       |-- gradle-wrapper.jar
|       `-- gradle-wrapper.properties
|-- gradlew
|-- gradlew.bat
|-- settings.gradle
`-- src
    `-- main
        `-- java
            `-- arkain
                `-- dev
                    `-- back
                        |-- BackApplication.java
                        |-- config
                        |   |-- CorsConfig.java
                        |   `-- WebSocketConfig.java
                        `-- poll
                            |-- app
                            |   `-- PollService.java
                            |-- common
                            |   `-- controller
                            |       `-- HealthCheckController.java
                            |-- controller
                            |   |-- PollController.java
                            |   `-- VoteController.java
                            |-- domain
                            |   |-- Option.java
                            |   `-- Poll.java
                            |-- dto
                            |   |-- CreatePollRequest.java
                            |   |-- CreatePollResponse.java
                            |   |-- PollResponse.java
                            |   `-- VoteMessage.java
                            `-- repository
                                `-- PollRepository.java
```

## 🔧 Tip & Guide
1. **Get URL and Port**
    - You can get the default URL/Port and add URL/Port in the top right.
    - Hover on the [Preview]->[Running URL and Port] button in menu bar.

2. **Command feature**
    - You can simply run your script using the shortcut icons on the top right.
    - Hover on the [Run]->[Add run command] button in menu bar.

3. **SSH Configuration**
    - This feature is only available for membership users.
    - You can SSH to the Arkain container from the outside via the [Menu]->[SSH Configuration] in menu bar.

## 💬 Support & Documentation
Visit [https://arkain.io](https://arkain.io/) to support and learn more about using arkain.

To watch usage guides, visit [https://docs.arkain.io](https://docs.arkain.io/).
