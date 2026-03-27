"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Battery, PhoneCall, MessageCircle, ChevronDown, Search, Zap, Shield,
  Clock, Award, CheckCircle2, ArrowRight, Car, Filter, RotateCcw,
} from "lucide-react";
import { carBrands, type CarBrand, type CarModel, type BatteryProduct } from "@/data/battery-data";
import { SITE_CONFIG } from "@/lib/seo";

interface BatteryCheckerProps {
  showDropdown?: boolean;
  showBrandGrid?: boolean;
}

export default function BatteryChecker({
  showDropdown = true,
  showBrandGrid = true,
}: BatteryCheckerProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [filterBatteryBrand, setFilterBatteryBrand] = useState<string>("all");

  // Derived data
  const currentBrand: CarBrand | undefined = useMemo(
    () => carBrands.find((b) => b.nameEn === selectedBrand),
    [selectedBrand]
  );

  const currentModel: CarModel | undefined = useMemo(
    () => currentBrand?.models.find((m) => m.name === selectedModel),
    [currentBrand, selectedModel]
  );

  const filteredBatteries: BatteryProduct[] = useMemo(() => {
    if (!currentModel) return [];
    if (filterBatteryBrand === "all") return currentModel.batteries;
    return currentModel.batteries.filter((b) => b.brand === filterBatteryBrand);
  }, [currentModel, filterBatteryBrand]);

  const batteryBrandsAvailable = useMemo(() => {
    if (!currentModel) return [];
    return [...new Set(currentModel.batteries.map((b) => b.brand))];
  }, [currentModel]);

  const handleBrandSelect = (brandEn: string) => {
    setSelectedBrand(brandEn);
    setSelectedModel("");
    setFilterBatteryBrand("all");
  };

  const handleModelSelect = (modelName: string) => {
    setSelectedModel(modelName);
    setFilterBatteryBrand("all");
  };

  const handleReset = () => {
    setSelectedBrand("");
    setSelectedModel("");
    setFilterBatteryBrand("all");
  };

  return (
    <div className="w-full">
      {/* ── Filter Section ── */}
      {showDropdown && <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl shadow-slate-200/60 border border-slate-100 p-5 sm:p-6 md:p-8 relative z-20">
        <div className="flex items-center justify-between mb-5 md:mb-6">
          <div className="flex items-center gap-2 text-slate-800">
            <Filter className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
            <span className="font-bold text-sm md:text-base">เลือกรถยนต์ของคุณ</span>
          </div>
          {selectedBrand && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-600 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              เริ่มใหม่
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {/* Brand Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
              ยี่ห้อรถ
            </label>
            <div className="relative">
              <select
                value={selectedBrand}
                onChange={(e) => handleBrandSelect(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 hover:border-red-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 rounded-xl px-4 py-3.5 text-base md:text-base text-slate-800 font-medium outline-none transition-all cursor-pointer"
              >
                <option value="">— เลือกยี่ห้อรถ —</option>
                {carBrands.map((b) => (
                  <option key={b.nameEn} value={b.nameEn}>
                    {b.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Model Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">
              รุ่นรถ
            </label>
            <div className="relative">
              <select
                value={selectedModel}
                onChange={(e) => handleModelSelect(e.target.value)}
                disabled={!selectedBrand}
                className="w-full appearance-none bg-slate-50 border border-slate-200 hover:border-red-300 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 rounded-xl px-4 py-3.5 text-base md:text-base text-slate-800 font-medium outline-none transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <option value="">— เลือกรุ่นรถ —</option>
                {currentBrand?.models.map((m) => (
                  <option key={m.name} value={m.name}>
                    {m.name} ({m.years})
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Selected Info */}
        {currentModel && (
          <div className="mt-4 md:mt-5 flex flex-wrap items-center gap-2 text-xs">
            <span className="bg-red-50 text-red-700 font-bold px-3 py-1.5 rounded-lg border border-red-100">
              <Battery className="w-3 h-3 inline mr-1" />
              ขนาดแนะนำ: {currentModel.batterySize}
            </span>
            <span className="bg-slate-50 text-slate-600 font-medium px-3 py-1.5 rounded-lg border border-slate-100">
              {currentModel.recommendedAmp} Ah
            </span>
            <span className="bg-slate-50 text-slate-600 font-medium px-3 py-1.5 rounded-lg border border-slate-100">
              เครื่อง: {currentModel.engineCC}
            </span>
          </div>
        )}
      </div>}

      {/* ── Brand Grid (when no brand selected) ── */}
      {showBrandGrid && !selectedBrand && (
        <div className="mt-8 md:mt-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 text-center mb-6 md:mb-8">
            เลือกยี่ห้อรถของคุณ
          </h2>
          <div className="grid grid-cols-2 min-[375px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 md:gap-4">
            {carBrands.map((brand) => (
              <button
                key={brand.nameEn}
                onClick={() => handleBrandSelect(brand.nameEn)}
                className="group flex flex-col items-center gap-2.5 p-4 md:p-5 bg-white border border-slate-100 hover:border-red-300 rounded-xl md:rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-red-100/50 sm:hover:-translate-y-1 active:scale-[0.97]"
              >
                <div className="w-14 h-14 md:w-14 md:h-14 bg-slate-50 group-hover:bg-red-50 rounded-xl md:rounded-2xl flex items-center justify-center transition-colors">
                  <Car className="w-7 h-7 md:w-7 md:h-7 text-slate-400 group-hover:text-red-600 transition-colors" />
                </div>
                <span className="text-sm md:text-sm font-bold text-slate-700 group-hover:text-red-700 transition-colors">
                  {brand.name}
                </span>
                <span className="text-[10px] text-slate-400">
                  {brand.models.length} รุ่น
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Model Grid (when brand selected but no model) ── */}
      {selectedBrand && !selectedModel && currentBrand && (
        <div className="mt-8 md:mt-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900 text-center mb-2">
            เลือกรุ่น {currentBrand.name}
          </h2>
          <p className="text-slate-400 text-sm text-center mb-6 md:mb-8">
            เลือกรุ่นรถของคุณเพื่อดูแบตเตอรี่ที่เหมาะสม
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {currentBrand.models.map((model) => (
              <button
                key={model.name}
                onClick={() => handleModelSelect(model.name)}
                className="group text-left bg-white border border-slate-100 hover:border-red-300 rounded-xl md:rounded-2xl p-4 md:p-5 transition-all duration-200 hover:shadow-lg hover:shadow-red-100/50 sm:hover:-translate-y-1 active:scale-[0.98]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-800 text-sm md:text-base group-hover:text-red-700 transition-colors mb-1">
                      {currentBrand.name} {model.name}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3">{model.years} · {model.engineCC}</p>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-md">
                        {model.batterySize}
                      </span>
                      <span className="text-[10px] font-semibold bg-slate-50 text-slate-500 px-2 py-0.5 rounded-md">
                        {model.recommendedAmp} Ah
                      </span>
                      <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-md">
                        {model.batteries.length} ตัวเลือก
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-red-600 transition-colors mt-1 flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Battery Results ── */}
      {currentModel && (
        <div className="mt-8 md:mt-12">
          {/* Results Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5 md:mb-6">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                แบตเตอรี่ที่แนะนำสำหรับ {selectedBrand} {currentModel.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                พบ {filteredBatteries.length} รายการ · ขนาดมาตรฐาน {currentModel.batterySize} · {currentModel.recommendedAmp} Ah
              </p>
            </div>

            {/* Battery Brand Filter */}
            {batteryBrandsAvailable.length > 1 && (
              <div className="flex gap-1.5 flex-wrap">
                <button
                  onClick={() => setFilterBatteryBrand("all")}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                    filterBatteryBrand === "all"
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-slate-500 border-slate-200 hover:border-red-300"
                  }`}
                >
                  ทั้งหมด
                </button>
                {batteryBrandsAvailable.map((bb) => (
                  <button
                    key={bb}
                    onClick={() => setFilterBatteryBrand(bb)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                      filterBatteryBrand === bb
                        ? "bg-red-600 text-white border-red-600"
                        : "bg-white text-slate-500 border-slate-200 hover:border-red-300"
                    }`}
                  >
                    {bb}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filteredBatteries.map((bat) => (
              <div
                key={bat.id}
                className="group relative bg-white border border-slate-100 hover:border-red-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-100/40 sm:hover:-translate-y-1"
              >
                {/* Top accent */}
                <div className="h-1 bg-gradient-to-r from-red-400 via-red-600 to-red-400" />

                <div className="p-4 md:p-5">
                  {/* Brand + Type */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                        <Battery className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-red-600 uppercase tracking-wider">
                          {bat.brand}
                        </span>
                        <span className="block text-xs text-slate-400">
                          {bat.type}
                        </span>
                      </div>
                    </div>
                    <span className="bg-slate-50 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-100">
                      ประกัน {bat.warranty}
                    </span>
                  </div>

                  {/* Model name */}
                  <h3 className="font-bold text-slate-800 text-sm md:text-base mb-2 leading-snug">
                    {bat.model}
                  </h3>

                  {/* Specs */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="text-[10px] font-semibold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">
                      {bat.amp} Ah
                    </span>
                    <span className="text-[10px] font-semibold bg-red-50 text-red-600 px-2 py-0.5 rounded-md">
                      CCA {bat.cca}
                    </span>
                    <span className="text-[10px] font-semibold bg-purple-50 text-purple-600 px-2 py-0.5 rounded-md">
                      {bat.size}
                    </span>
                    <span className="text-[10px] font-semibold bg-teal-50 text-teal-600 px-2 py-0.5 rounded-md">
                      ขั้ว{bat.terminal}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-1 mb-5">
                    {bat.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <Link
                      href={`tel:${SITE_CONFIG.phone}`}
                      className="flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-400 active:scale-[0.97] text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition-all"
                    >
                      <PhoneCall className="w-4 h-4" />
                      เช็คราคาโทร
                    </Link>
                    <Link
                      href={SITE_CONFIG.lineUrl}
                      target="_blank"
                      className="flex items-center justify-center gap-1.5 bg-[#06C755] hover:bg-[#05b84d] active:scale-[0.97] text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      เช็คราคาไลน์
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Warning Note */}
          <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-3 text-amber-700 text-sm">
            <Shield className="w-5 h-5 flex-shrink-0" />
            <p>
              <strong>หมายเหตุ:</strong> ข้อมูลแบตเตอรี่ข้างต้นเป็นขนาดแนะนำมาตรฐาน
              รถยนต์บางรุ่นอาจมีการดัดแปลงช่องใส่แบตเตอรี่ หรือมีอุปกรณ์ไฟฟ้าเสริม
              แนะนำให้ส่งรูปรถหรือแบตเตอรี่เดิมผ่านไลน์ เพื่อให้ช่างผู้เชี่ยวชาญประเมินขนาดที่เหมาะสมที่สุดครับ
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
