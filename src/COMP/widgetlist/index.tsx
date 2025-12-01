// components/WidgetManager/WidgetManager.tsx
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import { css } from '@emotion/react';
import { 
  HiSearch,
  HiEye,
  HiTrash,
  HiSave,
  HiRefresh,
  HiOutlineDocumentText,
} from 'react-icons/hi';
import {  MdTag } from 'react-icons/md';
import { absMan, WidgetData } from 'ACTR/RACT_absman_V00.04';

const WidgetManager: React.FC = () => {
  const [widgets, setWidgets] = useState<WidgetData[]>([]);
  const [filteredWidgets, setFilteredWidgets] = useState<WidgetData[]>([]);
  const [selectedWidget, setSelectedWidget] = useState<WidgetData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 10;

  const containerStyle = css`
    padding: 24px;
    min-height: 100vh;
    background: #f8fafc;
  `;

  const cardStyle = css`
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    overflow: hidden;
  `;

  const statusBadgeStyle = (status: string) => css`
    display: inline-block;
    padding: 4px 12px;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    ${status === 'active' && `
      background-color: #d1fae5;
      color: #065f46;
    `}
    ${status === 'inactive' && `
      background-color: #f3f4f6;
      color: #374151;
    `}
    ${status === 'draft' && `
      background-color: #fef3c7;
      color: #92400e;
    `}
  `;

  useEffect(() => {
    loadWidgets();
    
    const unsubscribe = absMan.subscribeToWidgets((newWidgets: WidgetData[]) => {
      setWidgets(newWidgets);
      applyFilters(newWidgets, searchTerm, statusFilter, typeFilter);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    applyFilters(widgets, searchTerm, statusFilter, typeFilter);
  }, [searchTerm, statusFilter, typeFilter, widgets]);

  const loadWidgets = (): void => {
    setLoading(true);
    const widgetList = absMan.getWidgets();
    setWidgets(widgetList);
    applyFilters(widgetList, searchTerm, statusFilter, typeFilter);
    setTimeout(() => setLoading(false), 300);
  };

  const applyFilters = (
    widgetList: WidgetData[], 
    search: string, 
    status: string, 
    type: string
  ): void => {
    let filtered = [...widgetList];
    
    if (search) {
      filtered = filtered.filter(widget =>
        widget.name.toLowerCase().includes(search.toLowerCase()) ||
        widget.description.toLowerCase().includes(search.toLowerCase()) ||
        widget.tags?.some((tag: string) => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }
    
    if (status !== 'all') {
      filtered = filtered.filter(widget => widget.status === status);
    }
    
    if (type !== 'all') {
      filtered = filtered.filter(widget => widget.type === type);
    }
    
    setFilteredWidgets(filtered);
  };

  const handleRowClick = (widget: WidgetData): void => {
    setSelectedWidget(widget);
    setIsModalOpen(true);
  };

  const handleDeleteWidget = (widgetId: string, e: MouseEvent): void => {
    e.stopPropagation();
    if (window.confirm('آیا از حذف این ویجت اطمینان دارید؟')) {
      absMan.deleteWidget(widgetId);
    }
  };

  const handleSaveToEnv = (): void => {
    if (selectedWidget) {
      absMan.logWidgetEvent(selectedWidget.id, {
        event: 'viewed_in_modal',
        handler: 'WidgetManager',
        description: 'Widget viewed in modal dialog'
      });
      
      alert(`ویجت "${selectedWidget.name}" در ENVI_widget ذخیره شد.`);
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'active': return 'فعال';
      case 'inactive': return 'غیرفعال';
      case 'draft': return 'پیش‌نویس';
      default: return status;
    }
  };

  const totalPages = Math.ceil(filteredWidgets.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedWidgets = filteredWidgets.slice(startIndex, startIndex + itemsPerPage);

  const renderWidgetDetails = (): React.ReactNode => {
    if (!selectedWidget) return null;

    return (
      <div className="space-y-4">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {['اطلاعات اصلی', 'متادیتا', 'لوژیک', 'رویدادها', 'متدها'].map((tab, index) => (
              <button
                key={tab}
                className={`py-2 px-4 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === index
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="pt-4">
          {activeTab === 0 && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">نام</h4>
                <p className="text-lg font-semibold">{selectedWidget.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">نوع</h4>
                <p className="text-lg">{selectedWidget.type}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">نسخه</h4>
                <p className="text-lg">{selectedWidget.version}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">وضعیت</h4>
                <span css={statusBadgeStyle(selectedWidget.status)}>
                  {getStatusText(selectedWidget.status)}
                </span>
              </div>
              <div className="col-span-2">
                <h4 className="text-sm font-medium text-gray-500">توضیحات</h4>
                <p className="text-gray-700">{selectedWidget.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">نویسنده</h4>
                <p>{selectedWidget.author}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">آخرین تغییر</h4>
                <p>{new Date(selectedWidget.lastModified).toLocaleString('fa-IR')}</p>
              </div>
            </div>
          )}

          {activeTab === 1 && selectedWidget.meta && (
            <div className="space-y-2">
              {Object.entries(selectedWidget.meta).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b pb-2">
                  <span className="font-medium">{key}</span>
                  <span className="text-gray-600">{value?.toString() || '-'}</span>
                </div>
              ))}
            </div>
          )}

          {/* بقیه تب‌ها */}
        </div>
      </div>
    );
  };

  return (
    <div css={containerStyle}>
      <div css={cardStyle} className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              🧩 مدیریت ویجت‌ها
            </h1>
            <p className="text-gray-600">
              مدیریت و مشاهده تمام ویجت‌های سیستم
            </p>
          </div>
          <button
            onClick={loadWidgets}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 flex items-center shadow-lg"
          >
            <HiRefresh className="ml-2 h-5 w-5" />
            بروزرسانی
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-blue-600">{widgets.length}</div>
            <div className="text-gray-600">کل ویجت‌ها</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-green-600">
              {widgets.filter(w => w.status === 'active').length}
            </div>
            <div className="text-gray-600">فعال</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-orange-600">
              {widgets.filter(w => w.status === 'draft').length}
            </div>
            <div className="text-gray-600">پیش‌نویس</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-red-600">
              {widgets.filter(w => w.status === 'inactive').length}
            </div>
            <div className="text-gray-600">غیرفعال</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <HiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="جستجوی ویجت..."
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value)}
              className="min-w-[150px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">همه وضعیت‌ها</option>
              <option value="active">فعال</option>
              <option value="inactive">غیرفعال</option>
              <option value="draft">پیش‌نویس</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value)}
              className="min-w-[150px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">همه انواع</option>
              {Array.from(new Set(widgets.map(w => w.type))).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              پاک کردن فیلترها
            </button>
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">نام ویجت</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">وضعیت</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">توضیحات</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">تگ‌ها</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">آخرین تغییر</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">عملیات</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedWidgets.map(widget => (
                    <tr 
                      key={widget.id}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleRowClick(widget)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-bold text-gray-900">{widget.name}</div>
                          <div className="text-sm text-gray-500">{widget.type}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span css={statusBadgeStyle(widget.status)}>
                          {getStatusText(widget.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        {widget.description}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {widget.tags?.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              <MdTag className="ml-1 h-3 w-3" />
                              {tag}
                            </span>
                          ))}
                          {widget.tags && widget.tags.length > 2 && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600">
                              +{widget.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(widget.lastModified).toLocaleDateString('fa-IR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2" onClick={(e: MouseEvent) => e.stopPropagation()}>
                          <button
                            onClick={() => handleRowClick(widget)}
                            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center"
                          >
                            <HiEye className="ml-1 h-4 w-4" />
                            مشاهده
                          </button>
                          <button
                            onClick={(e: MouseEvent) => handleDeleteWidget(widget.id, e)}
                            className="px-3 py-1 text-sm bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 flex items-center"
                          >
                            <HiTrash className="ml-1 h-4 w-4" />
                            حذف
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-6 space-x-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  قبلی
                </button>
                <span className="text-gray-600">
                  صفحه {page} از {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  بعدی
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredWidgets.length === 0 && (
              <div className="text-center py-12">
                <HiOutlineDocumentText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  ویجتی یافت نشد
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  با تغییر فیلترها دوباره امتحان کنید
                </p>
              </div>
            )}
          </>
        )}

        {/* Modal for widget details */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center">
                  <HiEye className="ml-2 h-5 w-5" />
                  <h2 className="text-lg font-semibold text-gray-900">جزئیات ویجت</h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                {selectedWidget && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {selectedWidget.name}
                        <span className="mr-3">
                          <span css={statusBadgeStyle(selectedWidget.status)}>
                            {getStatusText(selectedWidget.status)}
                          </span>
                        </span>
                      </h3>
                      <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                        ID: {selectedWidget.id}
                      </span>
                    </div>
                    {renderWidgetDetails()}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  بستن
                </button>
                <button
                  onClick={handleSaveToEnv}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded hover:from-purple-700 hover:to-blue-700 flex items-center"
                >
                  <HiSave className="ml-2 h-5 w-5" />
                  ذخیره در ENVI_widget
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetManager;