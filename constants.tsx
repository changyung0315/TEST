
import React from 'react';
import { ExamPaper } from './types';

export const EXAM_DATA: Record<string, ExamPaper> = {
  paperA: {
    id: 'paperA',
    title: "數學期末模擬考 (卷A - 基礎)",
    sections: [
      {
        name: "一、填填看",
        questions: [
          { id: "a1-1", text: "3公斤 = ( ? ) 公克", answer: "3000", explanation: "1公斤 = 1000公克，所以3公斤 = 3000公克" },
          { id: "a1-2", text: "2008公克 = ( ? ) 公斤 ( ? ) 公克", answer: "2 公斤 8 公克", explanation: "2000公克是2公斤，剩下8公克" },
          { id: "a1-3", text: "5公斤40公克 = ( ? ) 公克", answer: "5040", explanation: "5000 + 40 = 5040" },
          { id: "a1-4", text: "1/6 ( ? ) 1/8 (填 >,<,=)", answer: ">", explanation: "分母越小，代表平分的人越少，每一份就越大喔！" }
        ]
      },
      {
        name: "二、直式計算",
        questions: [
          { id: "a2-1", text: "84 ÷ 4 = ?", answer: "21", explanation: "先除十位：8÷4=2；再除個位：4÷4=1。答案是21。" },
          { id: "a2-2", text: "93 ÷ 7 = ?", answer: "13 ... 2", explanation: "7 x 10 = 70，剩下23。7 x 3 = 21，最後剩下2。答案是13 餘 2。" }
        ]
      },
      {
        name: "三、應用題",
        questions: [
          { id: "a3-1", text: "75張色紙平分給6人，每人幾張？剩幾張？", answer: "12張，剩3張", explanation: "這是一個除法問題。75 ÷ 6 = 12 ... 3，所以每人分到12張，剩下3張。" }
        ]
      }
    ]
  },
  paperB: {
    id: 'paperB',
    title: "數學期末模擬考 (卷B - 進階)",
    sections: [
      {
        name: "一、進階挑戰",
        questions: [
          { id: "b1-1", text: "1/9 ( ? ) 1/3 (填 >,<,=)", answer: "<", explanation: "分母越大，代表被切成越多份。切越多份，每一份就越小！" },
          { id: "b1-4", text: "找規律: 10, 20, 40, 70, ( ? )", answer: "110", explanation: "規律是：+10, +20, +30... 下一個應該是 +40，所以 70 + 40 = 110。" }
        ]
      }
    ]
  }
};

export const GRADE_3_TOPICS = [
  "除法 (兩位數除以一位數)",
  "分數 (同分母比較)",
  "重量與公克 (公斤/公克換算)",
  "規律與圖形",
  "乘法 (三位數乘以一位數)"
];
