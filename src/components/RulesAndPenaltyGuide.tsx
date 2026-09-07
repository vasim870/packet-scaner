import React, { useState } from 'react';
import {
  Scale,
  BookOpen,
  Calculator,
  ShieldAlert,
  HelpCircle,
  FileText,
  AlertTriangle,
  IndianRupee,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const RulesAndPenaltyGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'calculator' | 'tolerances'>('rules');
  const [expandedRule, setExpandedRule] = useState<string | null>('rule-6');

  // Calculator state
  const [offenderRole, setOffenderRole] = useState<'manufacturer' | 'retailer'>('retailer');
  const [offenseFrequency, setOffenseFrequency] = useState<'first' | 'second' | 'subsequent'>('first');
  const [selectedViolations, setSelectedViolations] = useState<string[]>(['dual_mrp']);

  const toggleViolation = (id: string) => {
    setSelectedViolations(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
  };

  // Calculate fine estimate
  const computePenalty = () => {
    let baseFine = 0;
    let maxFine = 0;
    let imprisonmentRisk = false;

    if (offenseFrequency === 'first') {
      baseFine = offenderRole === 'manufacturer' ? 25000 : 20000;
      maxFine = 25000;
    } else if (offenseFrequency === 'second') {
      baseFine = 50000;
      maxFine = 50000;
    } else {
      baseFine = 50000;
      maxFine = 100000;
      imprisonmentRisk = true;
    }

    // Add multiplier for multiple violations
    const multiplier = Math.max(1, selectedViolations.length * 0.75);
    const estimatedTotal = Math.round(baseFine * multiplier);

    return {
      fineRange: `₹${baseFine.toLocaleString('en-IN')} - ₹${Math.min(maxFine * 2, estimatedTotal).toLocaleString('en-IN')}`,
      imprisonmentRisk,
      section: offenseFrequency === 'subsequent' ? 'Section 36(2)' : 'Section 36(1)',
      act: 'Legal Metrology Act, 2009'
    };
  };

  const penaltyCalculation = computePenalty();

  const RULES_DATA = [
    {
      id: 'rule-6',
      title: 'Rule 6: Mandatory Declarations to be Made on Every Package',
      summary: 'Every pre-packaged commodity must carry 8 distinct statutory particulars on the Principal Display Panel.',
      content: `Clause 1 mandates declarations in Hindi or English:
(a) The name and complete address of the manufacturer, or where the manufacturer is not the packer, the name and address of the manufacturer and packer, and for imported goods, the name and address of the importer.
(b) The common or generic names of the commodity contained in the package.
(c) The net quantity, in terms of the standard unit of weight or measure (g, kg, ml, l).
(d) The month and year in which the commodity is manufactured or pre-packed or imported.
(da) The Unit Sale Price (USP) in Rupees and paise per gram, per kilogram, per millilitre, or per litre.
(e) The Maximum Retail Price (MRP) inclusive of all taxes in Indian Rupees.
(n) The name, address, telephone number and e-mail address of the person or office that may be contacted in case of consumer complaints.
(o) Country of Origin for imported commodities.`
    },
    {
      id: 'rule-18',
      title: 'Rule 18(2): Prohibition Against Sale Above MRP & Dual Pricing',
      summary: 'No retail dealer or other person shall make any sale of any commodity in packed form at a price exceeding the retail sale price thereof.',
      content: `Key provisions under Rule 18:
1. Selling packed goods at a price higher than the printed MRP is an offense punishable under Section 36 of the Act.
2. Dual MRP is illegal: Manufacturers cannot print different MRPs for identical products depending on the point of sale (e.g. higher MRP at multiplexes or airports was struck down by the Hon'ble Supreme Court of India in Federation of Hotel & Restaurant Associations of India v. Union of India).
3. Smudging, defacing, or affixing secondary price stickers over the original manufacturer MRP is strictly prohibited.`
    },
    {
      id: 'rule-24',
      title: 'Rule 24: Deceptive Packaging & Slack Fill Limits',
      summary: 'Every package shall be so packed as not to deceive the consumer regarding the size or volume of the commodity.',
      content: `Regulations on Deceptive Packaging:
1. A package shall be deemed to be deceptive if its dimensions are larger than necessary to hold the contents, with non-functional slack fill exceeding permissible tolerances.
2. In snacks, chips, and confectionery, headspace gas (such as nitrogen used for preservation) must not serve as a pretext to deceive consumers into assuming double or triple the actual product contents.
3. Violations trigger seizure of the entire production batch by the Legal Metrology Inspector.`
    },
    {
      id: 'rule-9',
      title: 'Rule 9: Minimum Height of Numerals & Letters',
      summary: 'Specifies the minimum height of letters and numerals on the principal display panel based on package net quantity.',
      content: `Minimum numeral height schedule:
• Net quantity up to 200 g / 200 ml: Minimum 2.0 mm (Blown/moulded: 4.0 mm)
• Net quantity 200 g to 1 kg / 1 L: Minimum 4.0 mm (Blown/moulded: 6.0 mm)
• Net quantity exceeding 1 kg / 1 L: Minimum 6.0 mm (Blown/moulded: 10.0 mm)
All declarations must be conspicuous, legible, and prominent with sufficient color contrast.`
    },
    {
      id: 'sec-36',
      title: 'Section 36 of Legal Metrology Act, 2009: Penalties',
      summary: 'Statutory penalties for manufacturing, packing, distributing or selling non-standard packages.',
      content: `Statutory Penalties under Section 36:
• First Offense: Fine which may extend to ₹25,000.
• Second Offense: Fine which may extend to ₹50,000.
• Subsequent Offenses: Fine which may extend to ₹1,00,000, or imprisonment for a term which may extend to one year, or both.
• Under Section 48, offenses may be compounded by the Controller or authorized Legal Metrology Officer on payment of prescribed compounding fees.`
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" />
              Statutory Compendium
            </span>
            <span className="text-xs text-slate-500">Ministry of Consumer Affairs</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Legal Metrology (Packaged Commodities) Rules 2011 & Penalty Matrix
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Complete regulatory clauses, mandatory declaration rules, permissible error thresholds, and statutory fine calculator under Section 36 of the Legal Metrology Act, 2009.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold shrink-0">
          <button
            id="tab-rules-compendium"
            onClick={() => setActiveTab('rules')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'rules'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Statutory Rules
          </button>
          <button
            id="tab-penalty-calc"
            onClick={() => setActiveTab('calculator')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'calculator'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Penalty Calculator
          </button>
          <button
            id="tab-tolerances"
            onClick={() => setActiveTab('tolerances')}
            className={`px-3.5 py-1.5 rounded-lg transition-colors ${
              activeTab === 'tolerances'
                ? 'bg-white text-slate-900 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Permissible Errors
          </button>
        </div>
      </div>

      {/* Tab 1: Rules Directory */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          {RULES_DATA.map(rule => {
            const isExpanded = expandedRule === rule.id;
            return (
              <div
                key={rule.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  id={`btn-rule-${rule.id}`}
                  onClick={() => setExpandedRule(isExpanded ? null : rule.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                      <BookOpen className="w-4.5 h-4.5 text-emerald-700 shrink-0" />
                      {rule.title}
                    </h3>
                    <p className="text-xs text-slate-500">{rule.summary}</p>
                  </div>
                  <span className="p-1 rounded-full bg-slate-100 text-slate-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {isExpanded && (
                  <div className="p-5 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-800 leading-relaxed font-mono whitespace-pre-line">
                    {rule.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Penalty Calculator */}
      {activeTab === 'calculator' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 text-xs">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Calculator className="w-4.5 h-4.5 text-emerald-700" />
                Statutory Offense Parameters
              </h3>
              <p className="text-slate-500 mt-0.5">
                Calculate compounding fee and fines under Section 36 of Legal Metrology Act, 2009.
              </p>
            </div>

            {/* Entity Role */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-800 block">Offending Entity Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  id="btn-role-retailer"
                  type="button"
                  onClick={() => setOffenderRole('retailer')}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors ${
                    offenderRole === 'retailer'
                      ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="block font-bold">Retail Dealer / Shop</span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    Store, Multiplex, Transit Hub, Supermarket
                  </span>
                </button>

                <button
                  id="btn-role-manufacturer"
                  type="button"
                  onClick={() => setOffenderRole('manufacturer')}
                  className={`p-3 rounded-xl border text-left font-medium transition-colors ${
                    offenderRole === 'manufacturer'
                      ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className="block font-bold">Manufacturer / Packer / Importer</span>
                  <span className="text-[11px] text-slate-500 font-normal">
                    FMCG Corporate, Packaging Facility, Importer
                  </span>
                </button>
              </div>
            </div>

            {/* Offense Frequency */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-800 block">Offense Count / Frequency</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  id="btn-freq-first"
                  type="button"
                  onClick={() => setOffenseFrequency('first')}
                  className={`p-2.5 rounded-xl border text-center transition-colors ${
                    offenseFrequency === 'first'
                      ? 'border-emerald-600 bg-emerald-50/60 text-emerald-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  First Offense
                </button>
                <button
                  id="btn-freq-second"
                  type="button"
                  onClick={() => setOffenseFrequency('second')}
                  className={`p-2.5 rounded-xl border text-center transition-colors ${
                    offenseFrequency === 'second'
                      ? 'border-amber-600 bg-amber-50/60 text-amber-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Second Offense
                </button>
                <button
                  id="btn-freq-subsequent"
                  type="button"
                  onClick={() => setOffenseFrequency('subsequent')}
                  className={`p-2.5 rounded-xl border text-center transition-colors ${
                    offenseFrequency === 'subsequent'
                      ? 'border-rose-600 bg-rose-50/60 text-rose-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  Subsequent (3rd+)
                </button>
              </div>
            </div>

            {/* Selected Infractions */}
            <div className="space-y-2">
              <label className="font-semibold text-slate-800 block">Detected Contraventions</label>
              <div className="space-y-2">
                {[
                  { id: 'dual_mrp', label: 'Dual MRP / Overcharging Beyond Stated Price (Rule 18(2))' },
                  { id: 'slack_fill', label: 'Deceptive Packaging & Excess Non-functional Slack Fill (Rule 24)' },
                  { id: 'missing_usp', label: 'Absence of Mandatory Unit Sale Price USP (Rule 6(1)(da))' },
                  { id: 'missing_care', label: 'Missing Consumer Grievance Care Details (Rule 6(1)(n))' },
                  { id: 'expired_goods', label: 'Sale of Expired Commodities / Defaced Expiry (Rule 6(1)(d))' }
                ].map(item => (
                  <label
                    key={item.id}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedViolations.includes(item.id)}
                      onChange={() => toggleViolation(item.id)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-slate-800 font-medium">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Calculator Output */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md space-y-6">
            <div className="border-b border-slate-700 pb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-semibold">
                Statutory Fine Computation
              </span>
              <h3 className="text-2xl font-black mt-1 text-white">
                {penaltyCalculation.fineRange}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Compoundable spot fine or court proceeding fine as per {penaltyCalculation.section}
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-700/60">
                <span className="text-slate-400">Statutory Governing Act:</span>
                <span className="font-semibold text-slate-200">{penaltyCalculation.act}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/60">
                <span className="text-slate-400">Governing Section:</span>
                <span className="font-semibold text-emerald-400">{penaltyCalculation.section}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/60">
                <span className="text-slate-400">Total Infractions Selected:</span>
                <span className="font-semibold text-slate-200">{selectedViolations.length}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-700/60">
                <span className="text-slate-400">Imprisonment Risk:</span>
                <span className={`font-bold ${penaltyCalculation.imprisonmentRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {penaltyCalculation.imprisonmentRisk ? 'Yes (Up to 1 year imprisonment)' : 'No (Monetary Compounding)'}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1">
              <p className="font-bold text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Enforcement Advisory
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Legal Metrology Officers have the power under Section 15 to enter premises without prior notice, inspect packages, seize non-conforming lots, and seal weighing instruments.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Tolerances Table */}
      {activeTab === 'tolerances' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 text-sm">
              First Schedule: Maximum Permissible Error (MPE) in Net Quantity
            </h3>
            <p className="text-slate-500 mt-0.5">
              Tolerance limits under Legal Metrology (Packaged Commodities) Rules 2011. Shortfalls exceeding these thresholds are punishable offenses.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                  <th className="py-2.5 px-3">Declared Net Quantity (g or ml)</th>
                  <th className="py-2.5 px-3">Maximum Permissible Error (% of Qty)</th>
                  <th className="py-2.5 px-3">Maximum Permissible Error (g or ml)</th>
                  <th className="py-2.5 px-3">Legal Status of Deviation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2.5 px-3 font-mono font-medium">Up to 50 g/ml</td>
                  <td className="py-2.5 px-3 font-semibold text-amber-700">9%</td>
                  <td className="py-2.5 px-3 font-mono">-</td>
                  <td className="py-2.5 px-3">Tolerable up to 4.5g</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-medium">50 to 100 g/ml</td>
                  <td className="py-2.5 px-3">-</td>
                  <td className="py-2.5 px-3 font-semibold text-amber-700">4.5 g or ml</td>
                  <td className="py-2.5 px-3">Fixed shortfall limit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-medium">100 to 200 g/ml</td>
                  <td className="py-2.5 px-3 font-semibold text-amber-700">4.5%</td>
                  <td className="py-2.5 px-3 font-mono">-</td>
                  <td className="py-2.5 px-3">e.g. 150g packet: max 6.75g deficit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-medium">200 to 300 g/ml</td>
                  <td className="py-2.5 px-3">-</td>
                  <td className="py-2.5 px-3 font-semibold text-amber-700">9.0 g or ml</td>
                  <td className="py-2.5 px-3">Fixed shortfall limit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-medium">300 to 500 g/ml</td>
                  <td className="py-2.5 px-3 font-semibold text-amber-700">3%</td>
                  <td className="py-2.5 px-3 font-mono">-</td>
                  <td className="py-2.5 px-3">e.g. 500g packet: max 15g deficit</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-medium">500 to 1000 g/ml (1kg/1L)</td>
                  <td className="py-2.5 px-3">-</td>
                  <td className="py-2.5 px-3 font-semibold text-amber-700">15.0 g or ml</td>
                  <td className="py-2.5 px-3">Strictly capped at 15g</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-medium">1000 to 10,000 g/ml</td>
                  <td className="py-2.5 px-3 font-semibold text-amber-700">1.5%</td>
                  <td className="py-2.5 px-3 font-mono">-</td>
                  <td className="py-2.5 px-3">5kg pack: max 75g deviation</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
