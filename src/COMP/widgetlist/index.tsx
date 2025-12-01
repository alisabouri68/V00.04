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
  HiOutlineCalendar
} from 'react-icons/hi';
import { MdTag } from 'react-icons/md';
import { absMan, WidgetData } from 'ACTR/RACT_absman_V00.04';
// Import your existing widgets


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

  // Sample widget data for testing (you can remove this after your widgets are added)
  const sampleWidgets: WidgetData[] = [
    {
      id: 'widget_1',
      name: 'User Profile Card',
      type: 'card',
      version: '1.0.0',
      status: 'active',
      description: 'Displays user profile information with avatar and stats',
      author: 'John Doe',
      lastModified: '2024-01-15T10:30:00Z',
      tags: ['profile', 'user', 'card'],
      meta: {
        model_id: 'model_001',
        model_title: 'Profile Card Model'
      }
    },
    {
      id: 'widget_2',
      name: 'Analytics Dashboard',
      type: 'dashboard',
      version: '2.1.0',
      status: 'active',
      description: 'Real-time analytics dashboard with charts and metrics',
      author: 'Jane Smith',
      lastModified: '2024-01-14T14:20:00Z',
      tags: ['analytics', 'dashboard', 'charts']
    },
    {
      id: 'widget_3',
      name: 'Notification Center',
      type: 'notification',
      version: '1.5.0',
      status: 'inactive',
      description: 'Centralized notification management system',
      author: 'Alex Johnson',
      lastModified: '2024-01-13T09:15:00Z',
      tags: ['notification', 'alerts', 'messages']
    },
    {
      id: 'widget_4',
      name: 'Settings Panel',
      type: 'settings',
      version: '0.9.0',
      status: 'draft',
      description: 'User settings configuration panel',
      author: 'Sam Wilson',
      lastModified: '2024-01-12T16:45:00Z',
      tags: ['settings', 'configuration', 'preferences']
    },
    {
      id: 'widget_5',
      name: 'Task Manager',
      type: 'task',
      version: '1.3.0',
      status: 'active',
      description: 'Task management and tracking widget',
      author: 'Mike Brown',
      lastModified: '2024-01-11T11:10:00Z',
      tags: ['tasks', 'productivity', 'management']
    }
  ];

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
    
    let widgetList = absMan.getWidgets();
    
    // If no widgets in absMan, use sample data
    if (widgetList.length === 0) {
      // Add sample widgets to absMan
      sampleWidgets.forEach(widget => {
        absMan.addWidget({
          name: widget.name,
          type: widget.type,
          version: widget.version,
          status: widget.status,
          description: widget.description,
          author: widget.author,
          tags: widget.tags || []
        });
      });
      
      widgetList = absMan.getWidgets();
    }
    
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
    if (window.confirm('Are you sure you want to delete this widget?')) {
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
      
      alert(`Widget "${selectedWidget.name}" saved to ENVI_widget.`);
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'active': return 'Active';
      case 'inactive': return 'Inactive';
      case 'draft': return 'Draft';
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
            {['Basic Info', 'Metadata', 'Logic', 'Events', 'Methods'].map((tab, index) => (
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
                <h4 className="text-sm font-medium text-gray-500">Name</h4>
                <p className="text-lg font-semibold">{selectedWidget.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Type</h4>
                <p className="text-lg">{selectedWidget.type}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Version</h4>
                <p className="text-lg">{selectedWidget.version}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Status</h4>
                <span css={statusBadgeStyle(selectedWidget.status)}>
                  {getStatusText(selectedWidget.status)}
                </span>
              </div>
              <div className="col-span-2">
                <h4 className="text-sm font-medium text-gray-500">Description</h4>
                <p className="text-gray-700">{selectedWidget.description}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Author</h4>
                <p>{selectedWidget.author}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Last Modified</h4>
                <p>{new Date(selectedWidget.lastModified).toLocaleString('en-US')}</p>
              </div>
              <div className="col-span-2">
                <h4 className="text-sm font-medium text-gray-500">Tags</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedWidget.tags?.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      <MdTag className="mr-1 h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 1 && (
            selectedWidget.meta ? (
              <div className="space-y-2">
                {Object.entries(selectedWidget.meta).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2">
                    <span className="font-medium">{key}</span>
                    <span className="text-gray-600">{value?.toString() || '-'}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No metadata available
              </div>
            )
          )}

          {activeTab === 2 && (
            selectedWidget.logic ? (
              <div className="space-y-3">
                {Object.entries(selectedWidget.logic).map(([key, value]) => {
                  const logicValue = value as {
                    value: boolean | string | number;
                    type: 'boolean' | 'string' | 'number';
                    description: string;
                  };
                  
                  return (
                    <div key={key} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{key}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          logicValue.type === 'boolean' ? 'bg-green-100 text-green-800' :
                          logicValue.type === 'string' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {logicValue.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{logicValue.description}</p>
                      <div className="bg-white p-3 rounded border">
                        <span className="font-mono text-sm">{JSON.stringify(logicValue.value)}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No logic configuration available
              </div>
            )
          )}

          {activeTab === 3 && (
            selectedWidget.events && selectedWidget.events.length > 0 ? (
              <div className="space-y-3">
                {selectedWidget.events.map(event => (
                  <div key={event.id} className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-lg">{event.event}</h4>
                      <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded">
                        {event.handler || 'default'}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{event.description}</p>
                    {event.timestamp && (
                      <div className="flex items-center text-sm text-gray-500">
                        <HiOutlineCalendar className="mr-1 h-4 w-4" />
                        {new Date(event.timestamp).toLocaleString('en-US')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No events recorded
              </div>
            )
          )}

          {activeTab === 4 && (
            selectedWidget.methods && selectedWidget.methods.length > 0 ? (
              <div className="space-y-3">
                {selectedWidget.methods.map(method => (
                  <div key={method.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold text-lg">{method.name}</h4>
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          method.type === 'function' ? 'bg-blue-100 text-blue-800' :
                          method.type === 'getter' ? 'bg-green-100 text-green-800' :
                          method.type === 'setter' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {method.type}
                        </span>
                        {method.enabled ? (
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                            Enabled
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                            Disabled
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600">{method.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No methods defined
              </div>
            )
          )}
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
              🧩 Widget Manager
            </h1>
            <p className="text-gray-600">
              Manage and view all system widgets
            </p>
          </div>
          <button
            onClick={loadWidgets}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 flex items-center shadow-lg"
          >
            <HiRefresh className="mr-2 h-5 w-5" />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-blue-600">{widgets.length}</div>
            <div className="text-gray-600">Total Widgets</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-green-600">
              {widgets.filter(w => w.status === 'active').length}
            </div>
            <div className="text-gray-600">Active</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-orange-600">
              {widgets.filter(w => w.status === 'draft').length}
            </div>
            <div className="text-gray-600">Draft</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            <div className="text-2xl font-bold text-red-600">
              {widgets.filter(w => w.status === 'inactive').length}
            </div>
            <div className="text-gray-600">Inactive</div>
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
                placeholder="Search widgets..."
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
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setTypeFilter(e.target.value)}
              className="min-w-[150px] px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              {Array.from(new Set(widgets.map(w => w.type))).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
                setPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Clear Filters
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Widget Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tags</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
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
                          <div className="text-sm text-gray-500">{widget.type} • v{widget.version}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span css={statusBadgeStyle(widget.status)}>
                          {getStatusText(widget.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 max-w-xs">
                        <div className="truncate">{widget.description}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {widget.tags?.slice(0, 2).map(tag => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              <MdTag className="mr-1 h-3 w-3" />
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
                        {new Date(widget.lastModified).toLocaleDateString('en-US')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2" onClick={(e: MouseEvent) => e.stopPropagation()}>
                          <button
                            onClick={() => handleRowClick(widget)}
                            className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center"
                          >
                            <HiEye className="mr-1 h-4 w-4" />
                            View
                          </button>
                          <button
                            onClick={(e: MouseEvent) => handleDeleteWidget(widget.id, e)}
                            className="px-3 py-1 text-sm bg-red-50 text-red-700 border border-red-200 rounded hover:bg-red-100 flex items-center"
                          >
                            <HiTrash className="mr-1 h-4 w-4" />
                            Delete
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
                  Previous
                </button>
                <span className="text-gray-600">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}

            {/* Empty State */}
            {filteredWidgets.length === 0 && !loading && (
              <div className="text-center py-12">
                <HiOutlineDocumentText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No widgets found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try changing your filters
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
                  <HiEye className="mr-2 h-5 w-5" />
                  <h2 className="text-lg font-semibold text-gray-900">Widget Details</h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 text-xl"
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
                        <span className="ml-3">
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
                  Close
                </button>
                <button
                  onClick={handleSaveToEnv}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded hover:from-purple-700 hover:to-blue-700 flex items-center"
                >
                  <HiSave className="mr-2 h-5 w-5" />
                  Save to ENVI_widget
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