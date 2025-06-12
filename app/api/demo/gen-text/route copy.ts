import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, provider, model } = await request.json();
    
    let responseText = '';
    
    // 处理Hugging Face Provider
    if (provider === 'huggingface') {
      const huggingfaceModel = model || 'google/gemma-7b-it'; // 默认使用7B指令版
      
      const response = await fetch(`https://api-inference.huggingface.co/models/${huggingfaceModel}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 1024,
            temperature: 0.7,
            top_p: 0.95,
            do_sample: true
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.statusText}`);
      }
      
      const result = await response.json();
      responseText = result[0].generated_text.replace(prompt, '').trim();
    }
    // 保留原有的DeepSeek处理逻辑作为备份
    else if (provider === 'deepseek') {
        // 使用 createOpenAICompatible 创建 DeepSeek 客户端
        const deepseekClient = createOpenAICompatible({
          name: "deepseek",
          apiKey: process.env.DEEPSEEK_API_KEY || "",
          baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com"
        });
        textModel = deepseekClient(model);
    }
    else {
      throw new Error(`不支持的提供商: ${provider}`);
    }
    
    return NextResponse.json({
      code: 0,
      message: 'success',
      data: {
        text: responseText
      }
    });
  } catch (error) {
    console.error('生成文本出错:', error);
    return NextResponse.json({
      code: 500,
      message: `错误: ${error instanceof Error ? error.message : '未知错误'}`,
    }, { status: 500 });
  }
}
