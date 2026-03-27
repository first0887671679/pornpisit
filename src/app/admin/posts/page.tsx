"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Edit, Trash2, Eye, EyeOff, Search, FileText } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ConfirmDialog from "@/components/admin/ConfirmDialog";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  category: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function PostsAdmin() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const togglePublish = async (post: Post) => {
    await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    });
    fetchPosts();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/posts/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    fetchPosts();
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.category || "").toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6 text-slate-800">บทความ / ข่าวสาร</h1>
        <p className="text-slate-400">กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">บทความ / ข่าวสาร</h1>
          <p className="text-sm text-slate-500 mt-1">จัดการบทความทั้งหมด ({posts.length} รายการ)</p>
        </div>
        <Link href="/admin/posts/new" className="flex-shrink-0">
          <Button className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            เขียนบทความใหม่
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          className="pl-10"
          placeholder="ค้นหาบทความ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Posts List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
          <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-lg font-medium">ยังไม่มีบทความ</p>
          <p className="text-sm mt-1">กด &quot;เขียนบทความใหม่&quot; เพื่อเริ่มต้น</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((post) => (
            <Card key={post.id} className={`transition-shadow hover:shadow-md ${!post.published ? "opacity-60" : ""}`}>
              <CardContent className="py-3 px-3 sm:py-4 sm:px-4">
                <div className="flex items-start sm:items-center gap-3">
                  {/* Cover thumbnail */}
                  <div className="w-14 h-10 sm:w-20 sm:h-14 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                    {post.coverImage ? (
                      <Image src={post.coverImage} alt={post.title} width={80} height={56} className="object-cover w-full h-full" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-slate-300" />
                      </div>
                    )}
                  </div>

                  {/* Info + Actions */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-sm sm:text-base text-slate-800 line-clamp-1">{post.title}</h3>
                      <div className="flex items-center gap-0.5 flex-shrink-0">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => togglePublish(post)} title={post.published ? "ซ่อน" : "เผยแพร่"}>
                          {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                        <Link href={`/admin/posts/${post.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600" onClick={() => setDeleteId(post.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 flex-wrap">
                      {post.category && (
                        <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-medium">
                          {post.category}
                        </span>
                      )}
                      <span>{new Date(post.createdAt).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <span className={`flex items-center gap-1 ${post.published ? "text-green-600" : "text-slate-400"}`}>
                        {post.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                        {post.published ? "เผยแพร่" : "แบบร่าง"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="ยืนยันการลบบทความ"
        message="คุณต้องการลบบทความนี้หรือไม่? การลบจะไม่สามารถกู้คืนได้"
        confirmLabel="ลบ"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
