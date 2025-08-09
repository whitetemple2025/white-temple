// src/app/admin/page.tsx
import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';

export const revalidate = 0;

const PAGE_SIZE = 15;

async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const params = await searchParams;
  const pageNum = Number(params?.page);
  const page = pageNum > 0 ? pageNum : 1;

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  async function approveMessage(formData: FormData) {
    'use server';
    const messageId = formData.get('id') as string;
    if (!messageId) return;

    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { error } = await adminSupabase
      .from('messages')
      .update({ approved: true })
      .eq('id', parseInt(messageId, 10));

    if (error) {
      console.error('Error approving message:', error.message);
    } else {
      revalidatePath('/admin');
    }
  }

  const { data: messages, error, count } = await supabase
    .from('messages')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0b1f3a] text-white p-8">
        <p className="text-red-300">讀取資料時發生錯誤: {error.message}</p>
      </div>
    );
  }

  const totalPages = Math.ceil((count ?? 0) / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-[#0b1f3a] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header className="mb-8">
          <h1
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
            style={{ color: 'var(--neon-green, #b3fd71)' }}
          >
            管理介面 (Admin)
          </h1>
          <p className="mt-2 text-sm text-white/70">
            審核使用者提交的懺悔內容。已核准的訊息會顯示在 View 頁面。
          </p>
        </header>

        <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm shadow-xl">
          <div className="overflow-x-auto rounded-2xl">
            <table className="min-w-full text-sm">
              <thead
                className="sticky top-0 z-10"
                style={{ backgroundColor: 'rgba(0, 74, 152, 0.85)' }}
              >
                <tr className="text-left text-white">
                  <th className="p-4 font-semibold">時間</th>
                  <th className="p-4 font-semibold">名字</th>
                  <th className="p-4 font-semibold">英文</th>
                  <th className="p-4 font-semibold">中文</th>
                  <th className="p-4 font-semibold">泰文</th>
                  <th className="p-4 font-semibold">狀態</th>
                  <th className="p-4 font-semibold">操作</th>
                </tr>
              </thead>
              <tbody>
                {messages?.map((msg: any, idx: number) => {
                  // 方案 A：補 Z 當成 UTC 處理，再轉成曼谷時間
                  const iso =
                    typeof msg.created_at === 'string' &&
                    !msg.created_at.endsWith('Z')
                      ? msg.created_at + 'Z'
                      : msg.created_at;

                  const formattedTime = new Date(iso).toLocaleString('zh-TW', {
                    timeZone: 'Asia/Bangkok',
                    hour12: false,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  });

                  return (
                    <tr
                      key={msg.id}
                      className={`transition-colors ${
                        idx % 2 === 0 ? 'bg-white/5' : 'bg-white/10'
                      }`}
                    >
                      <td className="p-4 align-top text-white/80">
                        <span className="tabular-nums">{formattedTime}</span>
                      </td>
                      <td className="p-4 align-top">
                        {msg.name?.trim() || '匿名'}
                      </td>
                      <td className="p-4 align-top max-w-xs">
                        <p className="line-clamp-3 hover:line-clamp-none whitespace-pre-wrap text-white/90">
                          {msg.english}
                        </p>
                      </td>
                      <td className="p-4 align-top max-w-xs">
                        <p className="line-clamp-3 hover:line-clamp-none whitespace-pre-wrap text-white/90">
                          {msg.chinese}
                        </p>
                      </td>
                      <td className="p-4 align-top max-w-xs">
                        <p className="line-clamp-3 hover:line-clamp-none whitespace-pre-wrap text-white/90">
                          {msg.thai}
                        </p>
                      </td>
                      <td className="p-4 align-top">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            msg.approved
                              ? 'bg-[color:var(--neon-green,#b3fd71)]/20 text-[color:var(--neon-green,#b3fd71)] ring-1 ring-[color:var(--neon-green,#b3fd71)]/40'
                              : 'bg-yellow-400/20 text-yellow-300 ring-1 ring-yellow-300/40'
                          }`}
                        >
                          {msg.approved ? '已核准' : '待審核'}
                        </span>
                      </td>
                      <td className="p-4 align-top">
                        {!msg.approved ? (
                          <form action={approveMessage}>
                            <input type="hidden" name="id" value={String(msg.id)} />
                            <button
                              type="submit"
                              className="px-3 py-1 rounded text-xs font-semibold shadow
                                         hover:scale-[1.03] transition
                                         ring-1 ring-white/15"
                              style={{
                                backgroundColor: 'var(--brand-blue, #004a98)',
                                color: '#ffffff',
                              }}
                            >
                              核准
                            </button>
                          </form>
                        ) : (
                          <span className="text-white/50 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
                {!messages?.length && (
                  <tr>
                    <td className="p-8 text-center text-white/70" colSpan={7}>
                      目前沒有資料。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-4 border-t border-white/10 text-sm">
            <span>
              共 <strong>{count ?? 0}</strong> 筆 / {totalPages} 頁
            </span>
            <div className="flex gap-2">
              {page > 1 && (
                <a
                  href={`/admin?page=${page - 1}`}
                  className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                >
                  上一頁
                </a>
              )}
              {page < totalPages && (
                <a
                  href={`/admin?page=${page + 1}`}
                  className="px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                >
                  下一頁
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
