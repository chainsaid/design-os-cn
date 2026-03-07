import { useMemo } from 'react'
import { Check, AlertTriangle, FileText, FolderTree, ChevronDown, Download, Package } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { AppLayout } from '@/components/AppLayout'
import { loadProductData, hasExportZip, getExportZipUrl } from '@/lib/product-loader'
import { getAllSectionIds, getSectionScreenDesigns } from '@/lib/section-loader'

export function ExportPage() {
  const productData = useMemo(() => loadProductData(), [])

  // Get section stats
  const sectionStats = useMemo(() => {
    const allSectionIds = getAllSectionIds()
    const sectionCount = productData.roadmap?.sections.length || 0
    const sectionsWithScreenDesigns = allSectionIds.filter(id => {
      const screenDesigns = getSectionScreenDesigns(id)
      return screenDesigns.length > 0
    }).length
    return { sectionCount, sectionsWithScreenDesigns, allSectionIds }
  }, [productData.roadmap])

  const hasOverview = !!productData.overview
  const hasRoadmap = !!productData.roadmap
  const hasDataShape = !!productData.dataShape
  const hasDesignSystem = !!productData.designSystem
  const hasShell = !!productData.shell
  const hasSections = sectionStats.sectionsWithScreenDesigns > 0

  const requiredComplete = hasOverview && hasRoadmap && hasSections

  // Check for export zip
  const exportZipAvailable = hasExportZip()
  const exportZipUrl = getExportZipUrl()

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            {exportZipAvailable ? '准备就绪，可以实施！' : '导出'}
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            {exportZipAvailable
              ? '下载产品设计包，并使用提供的交接提示词和资产在你的代码库中实施。'
              : '为你的开发团队生成完整的交接包。'}
          </p>
        </div>

        {/* Status - only show if zip not available */}
        {!exportZipAvailable && (
          <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                {requiredComplete ? (
                  <>
                    <div className="w-6 h-6 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-lime-600 dark:text-lime-400" strokeWidth={2.5} />
                    </div>
                    可以导出
                  </>
                ) : (
                  <>
                    <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" strokeWidth={2.5} />
                    </div>
                    尚未就绪
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <ChecklistItem label="产品概览" isComplete={hasOverview} />
                <ChecklistItem label="产品路线图" isComplete={hasRoadmap} />
                <ChecklistItem label="数据模型" isComplete={hasDataShape} />
                <ChecklistItem label="设计系统" isComplete={hasDesignSystem} />
                <ChecklistItem label="应用容器" isComplete={hasShell} />
                <ChecklistItem
                  label={`包含界面设计的模块 (${sectionStats.sectionsWithScreenDesigns}/${sectionStats.sectionCount})`}
                  isComplete={hasSections}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Export command */}
        {requiredComplete && (
          <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                {exportZipAvailable ? (
                  <>
                    <div className="w-6 h-6 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-lime-600 dark:text-lime-400" strokeWidth={2.5} />
                    </div>
                    导出包已就绪
                  </>
                ) : (
                  '生成导出包'
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {exportZipAvailable && exportZipUrl ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-lime-50 dark:bg-lime-900/20 rounded-lg border border-lime-200 dark:border-lime-800">
                    <div className="w-10 h-10 rounded-full bg-lime-100 dark:bg-lime-900/40 flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-lime-600 dark:text-lime-400" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-stone-900 dark:text-stone-100">
                        下载并在你的代码库中使用
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        product-plan.zip
                      </p>
                    </div>
                    <a
                      href={exportZipUrl}
                      download="product-plan.zip"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white font-medium text-sm rounded-md transition-colors shrink-0"
                    >
                      <Download className="w-4 h-4" strokeWidth={2} />
                      下载
                    </a>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    如需重新生成，请再次运行 <code className="font-mono text-stone-700 dark:text-stone-300">/export-product</code>。
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-stone-600 dark:text-stone-400">
                    运行以下命令生成完整的导出包，包含所有组件、类型和交接文档：
                  </p>
                  <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-3">
                    <code className="text-sm font-mono text-stone-800 dark:text-stone-200">
                      /export-product
                    </code>
                  </div>
                </div>
              )}

              {/* What's included */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <FolderTree className="w-4 h-4" strokeWidth={1.5} />
                  包含内容
                </h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <ExportItem
                    title="即用型提示词"
                    description="预先编写好的提示词，可直接复制/粘贴到你的编码代理中。"
                    items={['one-shot-prompt.md', 'section-prompt.md']}
                  />
                  <ExportItem
                    title="实施指南"
                    description="为你的编码代理提供的详细实施指南。"
                    items={['product-overview.md', 'one-shot-instructions.md', 'incremental/ (里程碑)']}
                  />
                  <ExportItem
                    title="设计系统"
                    description="颜色、字体和样式配置，确保品牌一致性。"
                    items={['CSS 原子', 'Tailwind 配置', '字体设置']}
                  />
                  <ExportItem
                    title="数据模型"
                    description="应用的实体定义和示例数据。"
                    items={['TypeScript 类型', '示例数据', '实体文档']}
                  />
                  <ExportItem
                    title="组件"
                    description="每个模块的 React 组件和视觉参考。"
                    items={['容器组件', '模块组件', '截图']}
                  />
                  <ExportItem
                    title="测试说明"
                    description="框架无关的测试规范，用于 TDD 实施。"
                    items={['每个模块的 tests.md', '用户流程测试', '空状态测试']}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* How to use */}
        <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-stone-500 dark:text-stone-400" strokeWidth={1.5} />
              如何使用导出
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Option A - Incremental (Recommended) */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-start justify-between w-full text-left group">
                <div className="flex-1">
                  <h4 className="font-medium text-stone-900 dark:text-stone-100">
                    方案 A：增量实施（推荐）
                  </h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    逐个里程碑构建，便于更好地控制和调试。
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400 dark:text-stone-500 mt-1 shrink-0 transition-transform group-data-[state=open]:rotate-180" strokeWidth={1.5} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ol className="text-sm text-stone-600 dark:text-stone-400 space-y-2 list-decimal list-inside mt-4 pl-1">
                  <li>将 <code className="font-mono text-stone-800 dark:text-stone-200">product-plan/</code> 文件夹复制到你的代码库中</li>
                  <li>从容器开始 (<code className="font-mono text-stone-800 dark:text-stone-200">instructions/incremental/01-shell.md</code>) — 原子设计 + 应用容器</li>
                  <li>
                    对于每个模块：
                    <ul className="mt-1.5 ml-5 space-y-1">
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                        打开 <code className="font-mono text-stone-800 dark:text-stone-200">prompts/section-prompt.md</code>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                        填写顶部的模块变量 (SECTION_NAME, SECTION_ID, NN)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                        将提示词复制/粘贴到你的 AI 编码代理中
                      </li>
                    </ul>
                  </li>
                  <li>在完成每个里程碑后审查并测试，然后再继续下一个</li>
                </ol>
              </CollapsibleContent>
            </Collapsible>

            <div className="border-t border-stone-200 dark:border-stone-700" />

            {/* Option B - One-Shot */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-start justify-between w-full text-left group">
                <div className="flex-1">
                  <h4 className="font-medium text-stone-900 dark:text-stone-100">
                    方案 B：一次性实施
                  </h4>
                  <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                    使用预先编写的提示词在一次会话中构建整个应用。
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-stone-400 dark:text-stone-500 mt-1 shrink-0 transition-transform group-data-[state=open]:rotate-180" strokeWidth={1.5} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ol className="text-sm text-stone-600 dark:text-stone-400 space-y-2 list-decimal list-inside mt-4 pl-1">
                  <li>将 <code className="font-mono text-stone-800 dark:text-stone-200">product-plan/</code> 文件夹复制到你的代码库中</li>
                  <li>打开 <code className="font-mono text-stone-800 dark:text-stone-200">prompts/one-shot-prompt.md</code></li>
                  <li>在提示词中添加任何额外的说明（技术栈偏好等）</li>
                  <li>将提示词复制/粘贴到你的 AI 编码代理中</li>
                  <li>回答代理关于认证、用户建模等的澄清问题</li>
                  <li>让代理规划并实施所有内容</li>
                </ol>
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

interface ChecklistItemProps {
  label: string
  isComplete: boolean
}

function ChecklistItem({ label, isComplete }: ChecklistItemProps) {
  return (
    <div className="flex items-center gap-2 py-1">
      {isComplete ? (
        <div className="w-4 h-4 rounded bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-stone-600 dark:text-stone-400" strokeWidth={3} />
        </div>
      ) : (
        <div className="w-4 h-4 rounded border-2 border-amber-400 dark:border-amber-500" />
      )}
      <span className="text-sm text-stone-700 dark:text-stone-300">
        {label}
      </span>
    </div>
  )
}

interface ExportItemProps {
  title: string
  description: string
  items: string[]
}

function ExportItem({ title, description, items }: ExportItemProps) {
  return (
    <div className="bg-stone-50 dark:bg-stone-800/50 rounded-lg p-4">
      <h4 className="font-medium text-stone-900 dark:text-stone-100 mb-1">{title}</h4>
      <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">{description}</p>
      <ul className="text-sm text-stone-600 dark:text-stone-400 space-y-1">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
