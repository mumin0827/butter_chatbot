//크시의 기능을 바탕으로 제작 하였으며, 연습용으로 제작했음을 밝힙니다.
const fs = require('node:fs');

module.exports = {
    name: 'messageCreate',
    once: false,
    run: async msg => {
        const prefix = "버터야"
        if (!msg.content.startsWith(prefix)) return;

        /** 버터의 대답을 불러오는 함수 **/
        function butter_protocol_f(command, content) {
            if (msg.content.startsWith(`${prefix}`) && msg.content.includes(command)) {
                if (Array.isArray(content)) {
                    //만약 content가 배열이라면, 배열에서 임의의 항목을 출력
                    const randomContent = content[Math.floor(Math.random() * content.length)];
                    const replacedContent = randomContent.includes('{user_displayName}')
                        ? randomContent.replace('{user_displayName}', msg.author.displayName) //참 일 때
                        : randomContent; //거짓 일 때 +삼항 연산자를 사용한 축약된 표현

                    msg.channel.send(replacedContent);
                } else {
                    //만약 content가 배열이 아닌 경우, 단일 문자열로 처리하고 출력
                    const replacedContent = content.includes('{user_displayName}')
                        ? content.replace('{user_displayName}', msg.author.displayName)
                        : content;

                    msg.channel.send(replacedContent);
                }
            }
        }

        // commands.json 파일 읽기
        const commandsData = fs.readFileSync('./database/butter_calls.json', 'utf-8');
        const commands = JSON.parse(commandsData);

        // commands를 기반으로 함수 호출
        for (const [command, content] of Object.entries(commands)) {
            butter_protocol_f(command, content);
        }
    }
}